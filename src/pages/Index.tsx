import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "login" | "register";

interface User { id: number; username: string; email: string; country: string; }

const LOGO = "https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016";
const VALVE_LOGO = "https://store.akamai.steamstatic.com/public/shared/images/valve_logo_white.png?t=962016";
const API = "https://functions.poehali.dev/9b420e52-8efc-4b16-9930-b8a30464eb43";

export default function Index() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // auth state
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // login fields
  const [loginVal, setLoginVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // register fields
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCountry, setRegCountry] = useState("Россия");
  const [regPass, setRegPass] = useState("");
  const [regPassConfirm, setRegPassConfirm] = useState("");
  const [regAgree, setRegAgree] = useState(false);

  const saveToken = (token: string) => {
    if (rememberMe) localStorage.setItem("steam_token", token);
    else sessionStorage.setItem("steam_token", token);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginVal, password: passVal }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка входа"); return; }
      saveToken(data.token);
      setUser(data.user);
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPass !== regPassConfirm) { setError("Пароли не совпадают"); return; }
    if (!regAgree) { setError("Примите соглашение для продолжения"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}?action=register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, email: regEmail, password: regPass, country: regCountry }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка регистрации"); return; }
      saveToken(data.token);
      setUser(data.user);
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("steam_token");
    sessionStorage.removeItem("steam_token");
    setUser(null);
    setLoginVal(""); setPassVal("");
  };

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
            {user ? (
              <>
                <div className="menuitem">
                  <span className="global_action_link" style={{ cursor: "default" }}>
                    {user.username}
                  </span>
                </div>
                <div className="menuitem">
                  <button onClick={handleLogout} className="global_action_link" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    Выйти
                  </button>
                </div>
              </>
            ) : (
              <div className="menuitem" id="account_pulldown">
                <a href="#" className="global_action_link">Войти</a>
              </div>
            )}
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
            <div className="store_nav_item highlighted"><a href="#" className="active">Магазин</a></div>
            <div className="store_nav_item"><a href="#">Сообщество</a></div>
            <div className="store_nav_item"><a href="#">О Steam</a></div>
            <div className="store_nav_item"><a href="#">Поддержка</a></div>
          </div>
        </div>
      </div>

      {/* ══ PAGE CONTENT ═══════════════════════════ */}
      <div className="responsive_page_content">
        <div className="responsive_page_template_content">
          <div className="page_content_ctn">
            <div id="login_ctn">
              <div id="login_form_ctn">

                {/* ══ LOGGED IN ══ */}
                {user ? (
                  <div className="newlogindialog_modal">
                    <div className="newlogindialog_modal_body" style={{ textAlign: "center", padding: "40px 28px" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
                      <div className="newlogindialog_header_h1" style={{ marginBottom: 8 }}>
                        Добро пожаловать, {user.username}!
                      </div>
                      <div style={{ color: "#8f98a0", fontSize: 13, marginBottom: 24 }}>
                        {user.email} · {user.country}
                      </div>
                      <button onClick={handleLogout} className="btn_blue_steamui btn_medium_wide">
                        <span>Выйти из аккаунта</span>
                      </button>
                    </div>
                  </div>
                ) : (

                <div className="newlogindialog_modal">
                  <div className="newlogindialog_modal_header">
                    <div className="newlogindialog_tabs_ctn">
                      <button
                        className={`newlogindialog_tab${tab === "login" ? " active" : ""}`}
                        onClick={() => { setTab("login"); setError(""); }}
                      >Войти</button>
                      <button
                        className={`newlogindialog_tab${tab === "register" ? " active" : ""}`}
                        onClick={() => { setTab("register"); setError(""); }}
                      >Создать аккаунт</button>
                    </div>
                  </div>

                  <div className="newlogindialog_modal_body">

                    {/* ─── LOGIN ─── */}
                    {tab === "login" && (
                      <>
                        <div className="newlogindialog_header">
                          <div className="newlogindialog_header_h1">Войти в Steam</div>
                        </div>
                        <form onSubmit={handleLogin}>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Войти с именем аккаунта</div>
                            <input
                              className="newlogindialog_input Focusable"
                              type="text"
                              autoComplete="username"
                              spellCheck={false}
                              value={loginVal}
                              onChange={(e) => setLoginVal(e.target.value)}
                              required
                            />
                          </div>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Пароль</div>
                            <div className="newlogindialog_pwfield">
                              <input
                                className="newlogindialog_input Focusable"
                                type={showPass ? "text" : "password"}
                                autoComplete="current-password"
                                value={passVal}
                                onChange={(e) => setPassVal(e.target.value)}
                                required
                              />
                              <button type="button" className="newlogindialog_eyebtn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                                <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="newlogindialog_remember_ctn">
                            <label className="newlogindialog_checkbox_label">
                              <input type="checkbox" className="newlogindialog_checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                              <span className="newlogindialog_checkbox_text">Запомнить меня</span>
                            </label>
                          </div>
                          {error && <div className="newlogindialog_error">{error}</div>}
                          <div className="newlogindialog_submit_ctn">
                            <button type="submit" className="btn_blue_steamui btn_medium_wide" disabled={loading}>
                              <span>{loading ? "Вход…" : "Войти"}</span>
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
                        <form onSubmit={handleRegister}>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Имя аккаунта</div>
                            <input className="newlogindialog_input Focusable" type="text" spellCheck={false}
                              value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required />
                            <div className="newlogindialog_subtext">Используется для входа. Изменить нельзя.</div>
                          </div>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Email-адрес</div>
                            <input className="newlogindialog_input Focusable" type="email"
                              value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                          </div>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Страна проживания</div>
                            <select className="newlogindialog_input newlogindialog_select Focusable"
                              value={regCountry} onChange={(e) => setRegCountry(e.target.value)}>
                              <option>Россия</option>
                              <option>Беларусь</option>
                              <option>Казахстан</option>
                              <option>Украина</option>
                            </select>
                          </div>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Пароль</div>
                            <div className="newlogindialog_pwfield">
                              <input className="newlogindialog_input Focusable"
                                type={showPass ? "text" : "password"}
                                value={regPass} onChange={(e) => setRegPass(e.target.value)} required />
                              <button type="button" className="newlogindialog_eyebtn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                                <Icon name={showPass ? "EyeOff" : "Eye"} size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="newlogindialog_inputrow">
                            <div className="newlogindialog_inputlabel">Подтвердите пароль</div>
                            <div className="newlogindialog_pwfield">
                              <input className="newlogindialog_input Focusable"
                                type={showConfirm ? "text" : "password"}
                                value={regPassConfirm} onChange={(e) => setRegPassConfirm(e.target.value)} required />
                              <button type="button" className="newlogindialog_eyebtn" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                                <Icon name={showConfirm ? "EyeOff" : "Eye"} size={14} />
                              </button>
                            </div>
                          </div>
                          {error && <div className="newlogindialog_error">{error}</div>}
                          <label className="newlogindialog_agree_label">
                            <input type="checkbox" className="newlogindialog_checkbox"
                              checked={regAgree} onChange={(e) => setRegAgree(e.target.checked)} />
                            <span className="newlogindialog_agree_text">
                              Я подтверждаю, что мне исполнилось 13 лет и принимаю{" "}
                              <a href="#" className="newlogindialog_text_link">Соглашение подписчика Steam</a>
                              {" "}и{" "}
                              <a href="#" className="newlogindialog_text_link">Политику конфиденциальности</a>.
                            </span>
                          </label>
                          <div className="newlogindialog_submit_ctn">
                            <button type="submit" className="btn_blue_steamui btn_medium_wide" disabled={loading}>
                              <span>{loading ? "Создание…" : "Продолжить"}</span>
                            </button>
                          </div>
                        </form>
                      </>
                    )}

                  </div>
                </div>
                )}

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
              <img src={VALVE_LOGO} alt="Valve" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </a>
          </div>
          <div id="footer_text">
            <div id="footer_links">
              <a href="#">Главная страница</a><span className="footer_sep">|</span>
              <a href="#">Политика конфиденциальности</a><span className="footer_sep">|</span>
              <a href="#">Правовая информация</a><span className="footer_sep">|</span>
              <a href="#">Соглашение</a><span className="footer_sep">|</span>
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