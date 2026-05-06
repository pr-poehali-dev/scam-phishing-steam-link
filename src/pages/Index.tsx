import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

const BG =
  "https://cdn.poehali.dev/projects/53a49d86-e42f-4d96-a8cc-d91ea0d7c8ba/files/492e7dbc-e3cb-4feb-91cd-a35257fbd2da.jpg";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="nx-root">
      {/* Background */}
      <div className="nx-bg" style={{ backgroundImage: `url('${BG}')` }} />
      <div className="nx-overlay" />

      {/* Header */}
      <header className="nx-header">
        <div className="nx-logo">
          <Icon name="Gamepad2" size={26} />
          <span>Steam</span>
        </div>
        <nav className="nx-nav">
          <a href="#">Магазин</a>
          <a href="#">Сообщество</a>
          <a href="#">Поддержка</a>
        </nav>
      </header>

      {/* Main */}
      <main className="nx-main">
        <div className="nx-card">
          {/* Tabs */}
          <div className="nx-tabs">
            <button
              className={`nx-tab${tab === "login" ? " active" : ""}`}
              onClick={() => setTab("login")}
            >
              Войти
            </button>
            <button
              className={`nx-tab${tab === "register" ? " active" : ""}`}
              onClick={() => setTab("register")}
            >
              Создать аккаунт
            </button>
          </div>

          {/* Login */}
          {tab === "login" && (
            <form className="nx-form" onSubmit={(e) => e.preventDefault()}>
              <p className="nx-subtitle">Войдите, чтобы открыть библиотеку игр</p>

              <div className="nx-field">
                <label>Имя аккаунта или Email</label>
                <div className="nx-input-wrap">
                  <Icon name="User" size={15} className="nx-ico" />
                  <input type="text" placeholder="Введите имя или email" autoComplete="username" />
                </div>
              </div>

              <div className="nx-field">
                <label>Пароль</label>
                <div className="nx-input-wrap">
                  <Icon name="Lock" size={15} className="nx-ico" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                  <button type="button" className="nx-eye" onClick={() => setShowPass(!showPass)}>
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              <div className="nx-row">
                <label className="nx-check">
                  <input type="checkbox" />
                  <span>Запомнить меня</span>
                </label>
                <a href="#" className="nx-forgot">Забыли пароль?</a>
              </div>

              <button type="submit" className="nx-btn-primary">
                Войти в аккаунт
              </button>

              <div className="nx-divider">
                <span />
                <p>или войти через</p>
                <span />
              </div>

              <div className="nx-socials">
                <button type="button" className="nx-social-btn">
                  <Icon name="Chrome" size={17} />
                  Google
                </button>
                <button type="button" className="nx-social-btn">
                  <Icon name="Github" size={17} />
                  GitHub
                </button>
              </div>
            </form>
          )}

          {/* Register */}
          {tab === "register" && (
            <form className="nx-form" onSubmit={(e) => e.preventDefault()}>
              <p className="nx-subtitle">Создайте бесплатный аккаунт и начните играть</p>

              <div className="nx-field">
                <label>Имя аккаунта</label>
                <div className="nx-input-wrap">
                  <Icon name="User" size={15} className="nx-ico" />
                  <input type="text" placeholder="Придумайте имя аккаунта" />
                </div>
              </div>

              <div className="nx-field">
                <label>Email</label>
                <div className="nx-input-wrap">
                  <Icon name="Mail" size={15} className="nx-ico" />
                  <input type="email" placeholder="Введите ваш email" />
                </div>
              </div>

              <div className="nx-field">
                <label>Пароль</label>
                <div className="nx-input-wrap">
                  <Icon name="Lock" size={15} className="nx-ico" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Придумайте пароль"
                  />
                  <button type="button" className="nx-eye" onClick={() => setShowPass(!showPass)}>
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              <div className="nx-field">
                <label>Подтвердите пароль</label>
                <div className="nx-input-wrap">
                  <Icon name="ShieldCheck" size={15} className="nx-ico" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Повторите пароль"
                  />
                  <button type="button" className="nx-eye" onClick={() => setShowConfirm(!showConfirm)}>
                    <Icon name={showConfirm ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              <label className="nx-check" style={{ marginBottom: "8px" }}>
                <input type="checkbox" />
                <span>
                  Я согласен с{" "}
                  <a href="#" className="nx-link">Условиями использования</a>{" "}
                  и{" "}
                  <a href="#" className="nx-link">Политикой конфиденциальности</a>
                </span>
              </label>

              <button type="submit" className="nx-btn-primary">
                Создать аккаунт
              </button>

              <p className="nx-switch">
                Уже есть аккаунт?{" "}
                <button type="button" onClick={() => setTab("login")} className="nx-link-btn">
                  Войти
                </button>
              </p>
            </form>
          )}
        </div>
      </main>

      <footer className="nx-footer">
        <p>© 2026 Steam. Все права защищены.</p>
        <div className="nx-footer-links">
          <a href="#">Конфиденциальность</a>
          <a href="#">Правовая информация</a>
          <a href="#">Контакты</a>
        </div>
      </footer>
    </div>
  );
}