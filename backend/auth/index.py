"""
Авторизация: регистрация и вход пользователей.
POST /register — создать аккаунт
POST /login    — войти в аккаунт
GET  /me       — получить текущего пользователя по токену
"""

import json
import os
import hashlib
import hmac
import secrets
import psycopg2
from datetime import datetime

SCHEMA = "t_p3297158_scam_phishing_steam_"
SECRET_KEY = os.environ.get("AUTH_SECRET_KEY", "steam-clone-secret-key-2025")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    salt = os.environ.get("AUTH_SECRET_KEY", SECRET_KEY)
    return hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()


def make_token(user_id: int, username: str) -> str:
    payload = f"{user_id}:{username}"
    sig = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}:{sig}"


def verify_token(token: str):
    try:
        parts = token.split(":")
        if len(parts) != 3:
            return None
        user_id, username, sig = parts
        expected = hmac.new(SECRET_KEY.encode(), f"{user_id}:{username}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return None
        return {"id": int(user_id), "username": username}
    except Exception:
        return None


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
    }


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    qs = event.get("queryStringParameters") or {}
    action = qs.get("action", "")
    if action:
        path = f"/{action}"

    # ── GET /me ────────────────────────────────────────
    if method == "GET" and path.endswith("/me"):
        token = event.get("headers", {}).get("X-Authorization", "").replace("Bearer ", "")
        user = verify_token(token)
        if not user:
            return {
                "statusCode": 401,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Не авторизован"}),
            }
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, username, email, country, created_at FROM {SCHEMA}.users WHERE id = %s",
            (user["id"],),
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return {
                "statusCode": 404,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Пользователь не найден"}),
            }
        return {
            "statusCode": 200,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({
                "id": row[0], "username": row[1], "email": row[2],
                "country": row[3], "created_at": str(row[4]),
            }),
        }

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    # ── POST /register ─────────────────────────────────
    if method == "POST" and path.endswith("/register"):
        username = (body.get("username") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""
        country = (body.get("country") or "Россия").strip()

        if not username or not email or not password:
            return {
                "statusCode": 400,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Заполните все поля"}),
            }
        if len(password) < 6:
            return {
                "statusCode": 400,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Пароль должен быть не менее 6 символов"}),
            }

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (username, email, password_hash, country) VALUES (%s, %s, %s, %s) RETURNING id",
                (username, email, pw_hash, country),
            )
            user_id = cur.fetchone()[0]
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            conn.close()
            return {
                "statusCode": 409,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Такое имя аккаунта или email уже существует"}),
            }
        finally:
            conn.close()

        token = make_token(user_id, username)
        return {
            "statusCode": 200,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({
                "token": token,
                "user": {"id": user_id, "username": username, "email": email, "country": country},
            }),
        }

    # ── POST /login ────────────────────────────────────
    if method == "POST" and path.endswith("/login"):
        login = (body.get("login") or "").strip()
        password = body.get("password") or ""

        if not login or not password:
            return {
                "statusCode": 400,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Введите имя аккаунта и пароль"}),
            }

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, username, email, country FROM {SCHEMA}.users WHERE (username = %s OR email = %s) AND password_hash = %s",
            (login, login, pw_hash),
        )
        row = cur.fetchone()

        if not row:
            conn.close()
            return {
                "statusCode": 401,
                "headers": {**cors_headers(), "Content-Type": "application/json"},
                "body": json.dumps({"error": "Неверное имя аккаунта или пароль"}),
            }

        cur.execute(f"UPDATE {SCHEMA}.users SET last_login = %s WHERE id = %s", (datetime.now(), row[0]))
        conn.commit()
        conn.close()

        token = make_token(row[0], row[1])
        return {
            "statusCode": 200,
            "headers": {**cors_headers(), "Content-Type": "application/json"},
            "body": json.dumps({
                "token": token,
                "user": {"id": row[0], "username": row[1], "email": row[2], "country": row[3]},
            }),
        }

    return {
        "statusCode": 404,
        "headers": {**cors_headers(), "Content-Type": "application/json"},
        "body": json.dumps({"error": "Not found"}),
    }