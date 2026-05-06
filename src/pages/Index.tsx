import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

const STEAM_LOGO =
  "https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="st-root">
      {/* BG gradient */}
      <div className="st-bg" />

      {/* Header */}
      <header className="st-header">
        <div className="st-header-inner">
          <img
            src={STEAM_LOGO}
            alt="Steam"
            className="st-logo-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
          <span className="st-logo-fallback hidden">STEAM</span>
          <nav className="st-nav">
            <a href="#">Магазин</a>
            <a href="#">Сообщество</a>
            <a href="#">О Steam</a>
            <a href="#">Поддержка</a>
          </nav>
          <div className="st-nav-right">
            <a href="#" className="st-nav-install">Установить Steam</a>
            {tab === "login" ? (
              <a href="#" className="st-nav-login" onClick={(e) => { e.preventDefault(); setTab("register"); }}>Создать аккаунт</a>
            ) : (
              <a href="#" className="st-nav-login" onClick={(e) => { e.preventDefault(); setTab("login"); }}>Войти</a>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="st-main">
        <div className="st-dialog">
          {/* Dialog header */}
          <div className="st-dialog-header">
            <div className="st-dialog-tabs">
              <button
                className={`st-dtab${tab === "login" ? " active" : ""}`}
                onClick={() => setTab("login")}
              >
                Войти
              </button>
              <button
                className={`st-dtab${tab === "register" ? " active" : ""}`}
                onClick={() => setTab("register")}
              >
                Создать аккаунт
              </button>
            </div>
          </div>

          {/* Dialog body */}
          <div className="st-dialog-body">
            {tab === "login" && (
              <>
                <h2 className="st-dialog-title">Войти в Steam</h2>
                <form className="st-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="st-field">
                    <label className="st-label">Войти с именем аккаунта</label>
                    <input
                      className="st-input"
                      type="text"
                      autoComplete="username"
                      spellCheck={false}
                    />
                  </div>

                  <div className="st-field">
                    <label className="st-label">Пароль</label>
                    <div className="st-input-wrap">
                      <input
                        className="st-input"
                        type={showPass ? "text" : "password"}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="st-eye"
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                      >
                        <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                      </button>
                    </div>
                  </div>

                  <label className="st-check-label">
                    <input type="checkbox" className="st-checkbox" />
                    <span>Запомнить меня</span>
                  </label>

                  <button type="submit" className="st-btn-blue">
                    Войти
                  </button>

                  <div className="st-help-links">
                    <a href="#" className="st-link-blue">Не могу войти</a>
                    <a href="#" className="st-link-blue">Забыли пароль?</a>
                  </div>

                  <div className="st-divider">
                    <span />
                    <p>или</p>
                    <span />
                  </div>

                  <button type="button" className="st-btn-qr">
                    <Icon name="QrCode" size={20} />
                    Войти с помощью QR-кода
                  </button>
                </form>
              </>
            )}

            {tab === "register" && (
              <>
                <h2 className="st-dialog-title">Создать аккаунт</h2>
                <form className="st-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="st-field">
                    <label className="st-label">Имя аккаунта</label>
                    <input className="st-input" type="text" spellCheck={false} />
                    <p className="st-hint">Имя аккаунта используется для входа и не&nbsp;может быть изменено.</p>
                  </div>

                  <div className="st-field">
                    <label className="st-label">Email-адрес</label>
                    <input className="st-input" type="email" />
                  </div>

                  <div className="st-field">
                    <label className="st-label">Страна проживания</label>
                    <select className="st-input st-select">
                      <option>Россия</option>
                      <option>Беларусь</option>
                      <option>Казахстан</option>
                      <option>Украина</option>
                    </select>
                  </div>

                  <div className="st-field">
                    <label className="st-label">Пароль</label>
                    <div className="st-input-wrap">
                      <input
                        className="st-input"
                        type={showPass ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="st-eye"
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                      >
                        <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="st-field">
                    <label className="st-label">Подтвердите пароль</label>
                    <div className="st-input-wrap">
                      <input
                        className="st-input"
                        type={showConfirm ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="st-eye"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                      >
                        <Icon name={showConfirm ? "EyeOff" : "Eye"} size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="st-captcha">
                    <div className="st-captcha-inner">
                      <div className="st-captcha-check">
                        <input type="checkbox" className="st-checkbox" />
                      </div>
                      <span>Я не робот</span>
                      <div className="st-captcha-logo">
                        <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                          <circle cx="32" cy="32" r="30" fill="#4A90D9" />
                          <text x="32" y="40" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="22" fill="white">rC</text>
                        </svg>
                        <div className="st-captcha-text">
                          <span>reCAPTCHA</span>
                          <span className="st-captcha-sub">Конфиденц. · Условия</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <label className="st-agree">
                    <input type="checkbox" className="st-checkbox" />
                    <span>
                      Я подтверждаю, что мне исполнилось 13 лет и принимаю{" "}
                      <a href="#" className="st-link-blue">Соглашение подписчика Steam</a>
                      {" "}и{" "}
                      <a href="#" className="st-link-blue">Политику конфиденциальности</a>.
                    </span>
                  </label>

                  <button type="submit" className="st-btn-blue">
                    Продолжить
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="st-footer">
        <div className="st-footer-inner">
          <div className="st-footer-links">
            <a href="#">Главная страница</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Правовая информация</a>
            <a href="#">Соглашение</a>
            <a href="#">Возрастные ограничения</a>
            <a href="#">Поддержка</a>
          </div>
          <p className="st-footer-copy">
            © 2025 Valve Corporation. Все права защищены. Все торговые марки являются собственностью соответствующих владельцев.
          </p>
        </div>
      </footer>
    </div>
  );
}
