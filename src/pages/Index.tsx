import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="st-root">
      {/* Header */}
      <header className="st-header">
        <div className="st-header-inner">
          <div className="st-logo">
            <svg width="176" height="44" viewBox="0 0 176 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="34" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36" fill="white" letterSpacing="-1">STEAM</text>
            </svg>
          </div>
          <nav className="st-nav">
            <a href="#">МАГАЗИН</a>
            <a href="#">СООБЩЕСТВО</a>
            <a href="#">О STEAM</a>
            <a href="#">ПОДДЕРЖКА</a>
          </nav>
        </div>
      </header>

      {/* Sub-nav */}
      <div className="st-subnav">
        <div className="st-subnav-inner">
          <a href="#" className="st-subnav-link active">ВОЙТИ</a>
          <a href="#" className="st-subnav-link">СОЗДАТЬ АККАУНТ</a>
        </div>
      </div>

      {/* Main */}
      <main className="st-main">
        <div className="st-page">
          {/* Tabs */}
          <div className="st-tabs">
            <button
              className={`st-tab${tab === "login" ? " active" : ""}`}
              onClick={() => setTab("login")}
            >
              Войти в существующий аккаунт
            </button>
            <button
              className={`st-tab${tab === "register" ? " active" : ""}`}
              onClick={() => setTab("register")}
            >
              Создать новый аккаунт
            </button>
          </div>

          <div className="st-panel">
            {/* Login */}
            {tab === "login" && (
              <div className="st-form-wrap">
                <h2 className="st-title">Войти в Steam</h2>

                <form className="st-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="st-field">
                    <label>Войти с именем аккаунта</label>
                    <input type="text" placeholder="" autoComplete="username" />
                  </div>

                  <div className="st-field">
                    <label>Пароль</label>
                    <div className="st-pass-wrap">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder=""
                        autoComplete="current-password"
                      />
                      <button type="button" className="st-eye" onClick={() => setShowPass(!showPass)}>
                        <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="st-check-row">
                    <label className="st-check">
                      <input type="checkbox" />
                      <span>Запомнить меня</span>
                    </label>
                  </div>

                  <button type="submit" className="st-btn-green">
                    Войти
                  </button>

                  <div className="st-links">
                    <a href="#" className="st-link">Я не могу войти</a>
                    <a href="#" className="st-link">Забыли пароль?</a>
                    <a href="#" className="st-link">Войти с помощью QR-кода</a>
                  </div>
                </form>
              </div>
            )}

            {/* Register */}
            {tab === "register" && (
              <div className="st-form-wrap">
                <h2 className="st-title">Создать аккаунт</h2>

                <form className="st-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="st-field">
                    <label>Имя аккаунта</label>
                    <input type="text" placeholder="" />
                    <p className="st-hint">Имя аккаунта используется для входа в Steam. Оно не может быть изменено после создания.</p>
                  </div>

                  <div className="st-field">
                    <label>Email-адрес</label>
                    <input type="email" placeholder="" />
                  </div>

                  <div className="st-field">
                    <label>Страна проживания</label>
                    <select>
                      <option>Россия</option>
                      <option>Беларусь</option>
                      <option>Казахстан</option>
                      <option>Украина</option>
                    </select>
                  </div>

                  <div className="st-field">
                    <label>Пароль</label>
                    <div className="st-pass-wrap">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder=""
                      />
                      <button type="button" className="st-eye" onClick={() => setShowPass(!showPass)}>
                        <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="st-field">
                    <label>Подтвердите пароль</label>
                    <div className="st-pass-wrap">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder=""
                      />
                      <button type="button" className="st-eye" onClick={() => setShowConfirm(!showConfirm)}>
                        <Icon name={showConfirm ? "EyeOff" : "Eye"} size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="st-captcha-box">
                    <div className="st-captcha-inner">
                      <Icon name="ShieldCheck" size={28} />
                      <span>Я не робот</span>
                    </div>
                  </div>

                  <label className="st-agree">
                    <input type="checkbox" />
                    <span>
                      Я подтверждаю, что мне исполнилось 13 лет и я принимаю{" "}
                      <a href="#" className="st-link">Соглашение подписчика Steam</a>{" "}
                      и{" "}
                      <a href="#" className="st-link">Политику конфиденциальности</a>.
                    </span>
                  </label>

                  <button type="submit" className="st-btn-green">
                    Создать аккаунт
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="st-footer">
        <div className="st-footer-inner">
          <div className="st-footer-logo">
            <svg width="100" height="22" viewBox="0 0 100 22" fill="none">
              <text x="0" y="17" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#8ba3b5" letterSpacing="-0.5">STEAM</text>
            </svg>
          </div>
          <div className="st-footer-links">
            <a href="#">Главная страница</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Правовая информация</a>
            <a href="#">Соглашение</a>
            <a href="#">Возрастные ограничения</a>
            <a href="#">Поддержка</a>
          </div>
          <p className="st-footer-copy">
            © 2025 Valve Corporation. Все права защищены. Все торговые марки являются собственностью соответствующих владельцев в США и других странах.
          </p>
          <div className="st-footer-langs">
            <a href="#">Русский</a> | <a href="#">English</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
