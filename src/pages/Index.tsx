import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

const LOGO = "https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016";
const VALVE_LOGO = "https://store.akamai.steamstatic.com/public/shared/images/valve_logo_white.png?t=962016";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="v6 game_bg">

      {/* ══ GLOBAL HEADER ══════════════════════════ */}
      <div id="global_header" className="responsive_header">
        <div className="content">
          <div className="logo">
            <a href="#">
              <img src={LOGO} alt="Steam"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </a>
          </div>
          <div className="supernav">
            <div className="menuitem" id="account_pulldown">
              <a href="#" className="global_action_link">Войти</a>
            </div>
            <div className="menuitem">
              <a href="#" className="header_installsteam_btn">
                <div className="btn_green_white_innerfade btn_medium">
                  <span>Установить Steam</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STORE NAV ══════════════════════════════ */}
      <div id="store_nav_area" className="responsive_page_menu">
        <div id="store_nav_links">
          <div id="store_nav" className="responsive_page_menu_content">
            <div className="store_nav_item highlighted">
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

      {/* ══ PAGE CONTENT ═══════════════════════════ */}
      <div id="page_background_image_responsive" className="page_background"></div>
      <div className="responsive_page_content">
        <div className="responsive_page_template_content">
          <div className="page_content_ctn">

            <div id="login_ctn">
              <div id="login_form_ctn" className="newlogindialog_throbber_ctn">

                {/* DIALOG */}
                <div className="newlogindialog_modal">

                  {/* header / tabs */}
                  <div className="newlogindialog_modal_header">
                    <div className="newlogindialog_tabs_ctn">
                      <button
                        className={`newlogindialog_tab${tab === "login" ? " active" : ""}`}
                        onClick={() => setTab("login")}
                      >
                        Войти
                      </button>
                      <button
                        className={`newlogindialog_tab${tab === "register" ? " active" : ""}`}
                        onClick={() => setTab("register")}
                      >
                        Создать аккаунт
                      </button>
                    </div>
                  </div>

                  {/* body */}
                  <div className="newlogindialog_modal_body">

                    {/* ─── LOGIN ─── */}
                    {tab === "login" && (
                      <>
                        <div className="newlogindialog_header">
                          <div className="newlogindialog_header_h1">Войти в Steam</div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">
                              Войти с именем аккаунта
                            </div>
                            <input
                              className="newlogindialog_input Focusable"
                              type="text"
                              autoComplete="username"
                              spellCheck={false}
                            />
                          </div>

                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Пароль</div>
                            <div className="newlogindialog_pwfield">
                              <input
                                className="newlogindialog_input Focusable"
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

                          <div className="newlogindialog_remember_ctn">
                            <label className="newlogindialog_checkbox_label">
                              <input type="checkbox" className="newlogindialog_checkbox" />
                              <span className="newlogindialog_checkbox_text">Запомнить меня</span>
                            </label>
                          </div>

                          <div className="newlogindialog_submit_ctn">
                            <button type="submit" className="btn_blue_steamui btn_medium_wide">
                              <span>Войти</span>
                            </button>
                          </div>

                          <div className="newlogindialog_help_ctn">
                            <a href="#" className="newlogindialog_text_link">Я не могу войти</a>
                            <a href="#" className="newlogindialog_text_link">Забыли пароль?</a>
                          </div>

                          <div className="newlogindialog_or_ctn">
                            <div className="newlogindialog_or_line" />
                            <div className="newlogindialog_or_text">или</div>
                            <div className="newlogindialog_or_line" />
                          </div>

                          <div className="newlogindialog_qr_ctn">
                            <button type="button" className="newlogindialog_qr_btn">
                              <Icon name="QrCode" size={18} />
                              <span>Войти с помощью QR-кода</span>
                            </button>
                          </div>
                        </form>
                      </>
                    )}

                    {/* ─── REGISTER ─── */}
                    {tab === "register" && (
                      <>
                        <div className="newlogindialog_header">
                          <div className="newlogindialog_header_h1">Создать аккаунт Steam</div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Имя аккаунта</div>
                            <input
                              className="newlogindialog_input Focusable"
                              type="text"
                              spellCheck={false}
                            />
                            <div className="newlogindialog_subtext">
                              Имя аккаунта используется для входа в Steam и не может быть изменено после создания.
                            </div>
                          </div>

                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Email-адрес</div>
                            <input className="newlogindialog_input Focusable" type="email" />
                          </div>

                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Страна проживания</div>
                            <select className="newlogindialog_input newlogindialog_select Focusable">
                              <option>Россия</option>
                              <option>Беларусь</option>
                              <option>Казахстан</option>
                              <option>Украина</option>
                            </select>
                          </div>

                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Пароль</div>
                            <div className="newlogindialog_pwfield">
                              <input
                                className="newlogindialog_input Focusable"
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
                            <div className="newlogindialog_pwfield">
                              <input
                                className="newlogindialog_input Focusable"
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

                          <div className="newlogindialog_captcha_ctn">
                            <div className="newlogindialog_captcha_widget">
                              <label className="newlogindialog_captcha_check">
                                <input type="checkbox" />
                                <span>Я не робот</span>
                              </label>
                              <div className="newlogindialog_captcha_logo">
                                <div className="captcha_rc_icon">rC</div>
                                <div className="captcha_rc_text">
                                  <span>reCAPTCHA</span>
                                  <span>Конфид. · Условия</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <label className="newlogindialog_agree_label">
                            <input type="checkbox" className="newlogindialog_checkbox" />
                            <span className="newlogindialog_agree_text">
                              Я подтверждаю, что мне исполнилось 13 лет и принимаю{" "}
                              <a href="#" className="newlogindialog_text_link">Соглашение подписчика Steam</a>
                              {" "}и{" "}
                              <a href="#" className="newlogindialog_text_link">Политику конфиденциальности</a>.
                            </span>
                          </label>

                          <div className="newlogindialog_submit_ctn">
                            <button type="submit" className="btn_blue_steamui btn_medium_wide">
                              <span>Продолжить</span>
                            </button>
                          </div>
                        </form>
                      </>
                    )}

                  </div>{/* /modal_body */}
                </div>{/* /modal */}

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ FOOTER ══════════════════════════════════ */}
      <div id="footer" className="v6">
        <div className="footer_content v6">
          <div id="footer_logo">
            <a href="https://www.valvesoftware.com/" target="_blank" rel="noreferrer">
              <img src={VALVE_LOGO} alt="Valve"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </a>
          </div>
          <div id="footer_text">
            <div id="footer_links">
              <a href="#">Главная страница</a>
              <span className="footer_sep">|</span>
              <a href="#">Политика конфиденциальности</a>
              <span className="footer_sep">|</span>
              <a href="#">Правовая информация</a>
              <span className="footer_sep">|</span>
              <a href="#">Соглашение</a>
              <span className="footer_sep">|</span>
              <a href="#">Поддержка</a>
            </div>
            <div className="valve_links_footer">
              © 2025 Valve Corporation. Все права защищены. Все торговые марки являются собственностью соответствующих владельцев в США и других странах.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
