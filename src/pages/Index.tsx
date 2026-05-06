import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="st-root">

      {/* ── GLOBAL HEADER ── */}
      <div id="global_header">
        <div className="content">
          <div className="logo">
            <a href="#">
              <img
                src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
                alt="Steam"
                onError={(e) => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).style.display="none"; }}
              />
              <span className="logo-fallback">STEAM</span>
            </a>
          </div>

          <div className="header_links">
            <a href="#" className="header_installsteam_btn">
              <div className="btn_medium">
                <span>Установить Steam</span>
              </div>
            </a>
            <a href="#" className="global_action_link" onClick={(e)=>{ e.preventDefault(); setTab(tab==="login"?"register":"login"); }}>
              {tab === "login" ? "Создать аккаунт" : "Войти"}
            </a>
          </div>
        </div>
      </div>

      {/* ── STORE NAV ── */}
      <div id="store_nav_area">
        <div id="store_nav_links">
          <div id="store_nav" className="responsive_page_menu_content">
            <div className="store_nav_item">
              <a href="#" className="active">Магазин</a>
            </div>
            <div className="store_nav_item">
              <a href="#">Сообщество</a>
            </div>
            <div className="store_nav_item">
              <a href="#">О Steam</a>
            </div>
            <div className="store_nav_item">
              <a href="#">Поддержка</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="st-page-bg">
        <div className="st-page-content">
          <div className="newlogindialog_background">
            <div className="newlogindialog">

              {/* tabs */}
              <div className="newlogindialog_tabs">
                <button
                  className={`newlogindialog_tab${tab === "login" ? " Panel active" : " Panel"}`}
                  onClick={() => setTab("login")}
                >
                  Войти
                </button>
                <button
                  className={`newlogindialog_tab${tab === "register" ? " Panel active" : " Panel"}`}
                  onClick={() => setTab("register")}
                >
                  Создать аккаунт
                </button>
              </div>

              {/* body */}
              <div className="newlogindialog_content">

                {tab === "login" && (
                  <>
                    <div className="newlogindialog_header">
                      <div className="newlogindialog_header_desc">Войти в Steam</div>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Войти с именем аккаунта</div>
                        <input
                          className="newlogindialog_input"
                          type="text"
                          autoComplete="username"
                          spellCheck={false}
                        />
                      </div>

                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Пароль</div>
                        <div className="newlogindialog_passwrap">
                          <input
                            className="newlogindialog_input"
                            type={showPass ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            className="newlogindialog_eyebtn"
                            onClick={() => setShowPass(!showPass)}
                            tabIndex={-1}
                          >
                            <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="newlogindialog_remember">
                        <label>
                          <input type="checkbox" />
                          <span>Запомнить меня</span>
                        </label>
                      </div>

                      <div className="newlogindialog_submitrow">
                        <button type="submit" className="btn_blue_steamui btn_medium">
                          <span>Войти</span>
                        </button>
                      </div>

                      <div className="newlogindialog_helplinks">
                        <a href="#" className="newlogindialog_link">Не могу войти</a>
                        <a href="#" className="newlogindialog_link">Забыли пароль?</a>
                      </div>

                      <div className="newlogindialog_divider">
                        <span /><span className="newlogindialog_divider_text">или</span><span />
                      </div>

                      <button type="button" className="newlogindialog_qr_btn">
                        <Icon name="QrCode" size={18} />
                        Войти с помощью QR-кода
                      </button>
                    </form>
                  </>
                )}

                {tab === "register" && (
                  <>
                    <div className="newlogindialog_header">
                      <div className="newlogindialog_header_desc">Создать аккаунт Steam</div>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Имя аккаунта</div>
                        <input className="newlogindialog_input" type="text" spellCheck={false} />
                        <div className="newlogindialog_hint">Используется для входа. Изменить нельзя.</div>
                      </div>

                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Email-адрес</div>
                        <input className="newlogindialog_input" type="email" />
                      </div>

                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Страна проживания</div>
                        <select className="newlogindialog_input newlogindialog_select">
                          <option>Россия</option>
                          <option>Беларусь</option>
                          <option>Казахстан</option>
                          <option>Украина</option>
                        </select>
                      </div>

                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Пароль</div>
                        <div className="newlogindialog_passwrap">
                          <input
                            className="newlogindialog_input"
                            type={showPass ? "text" : "password"}
                          />
                          <button
                            type="button"
                            className="newlogindialog_eyebtn"
                            onClick={() => setShowPass(!showPass)}
                            tabIndex={-1}
                          >
                            <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="newlogindialog_inputrow">
                        <div className="newlogindialog_inputlabel">Подтвердите пароль</div>
                        <div className="newlogindialog_passwrap">
                          <input
                            className="newlogindialog_input"
                            type={showConfirm ? "text" : "password"}
                          />
                          <button
                            type="button"
                            className="newlogindialog_eyebtn"
                            onClick={() => setShowConfirm(!showConfirm)}
                            tabIndex={-1}
                          >
                            <Icon name={showConfirm ? "EyeOff" : "Eye"} size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="newlogindialog_captcha">
                        <label>
                          <input type="checkbox" />
                          <span>Я не робот</span>
                        </label>
                        <div className="newlogindialog_captcha_badge">
                          <div className="captcha_icon">rC</div>
                          <div className="captcha_label">
                            <span>reCAPTCHA</span>
                            <span>Конфид. · Условия</span>
                          </div>
                        </div>
                      </div>

                      <label className="newlogindialog_agree">
                        <input type="checkbox" />
                        <span>
                          Я подтверждаю, что мне исполнилось 13 лет и принимаю{" "}
                          <a href="#" className="newlogindialog_link">Соглашение подписчика Steam</a>
                          {" "}и{" "}
                          <a href="#" className="newlogindialog_link">Политику конфиденциальности</a>.
                        </span>
                      </label>

                      <div className="newlogindialog_submitrow">
                        <button type="submit" className="btn_blue_steamui btn_medium">
                          <span>Продолжить</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div id="footer">
        <div className="footer_content">
          <div id="footer_logo">
            <a href="#">
              <img
                src="https://store.akamai.steamstatic.com/public/shared/images/footer/logo_valve_footer.png"
                alt="Valve"
                onError={(e)=>{(e.target as HTMLImageElement).style.display="none";}}
              />
            </a>
          </div>
          <div id="footer_text">
            <div className="footer_links">
              <a href="#">Главная страница</a>
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Правовая информация</a>
              <a href="#">Соглашение</a>
              <a href="#">Поддержка</a>
            </div>
            <div className="valve_links_footer">
              © 2025 Valve Corporation. Все права защищены. Все торговые марки являются собственностью соответствующих владельцев.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
