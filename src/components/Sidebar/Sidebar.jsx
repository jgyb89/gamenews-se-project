import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import desktopLogo from "../../images/gamenews-logo-white.svg";
import mobileLogo from "../../images/GameNews-mobile-logo.svg";

const navItems = [
  { path: "/search", icon: "search", title: "Search" },
  { path: "/notifications", icon: "notifications", title: "Notifications" },
  { path: "/messages", icon: "mail", title: "Messages" },
  { path: "/discover", icon: "explore", title: "Discover" },
  { path: "/create", icon: "add_circle", title: "Create" },
  { path: "/groups", icon: "group", title: "Groups" },
  { path: "/news", icon: "newspaper", title: "News" },
];

const Sidebar = ({ isLoggedIn, handleOpenModal, isLightMode, toggleTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <Link to="/" className="sidebar__logo-link">
        <img
          src={isCollapsed ? mobileLogo : desktopLogo}
          alt={isCollapsed ? "GameNews Logo Mobile" : "GameNews Logo"}
          className="sidebar__logo"
        />
      </Link>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {navItems.map((item) => (
            <li className="sidebar__item" key={item.path}>
              <NavLink to={item.path} className="sidebar__link">
                <span className="material-symbols-outlined sidebar__icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar__text">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <button className="sidebar__collapse-button" onClick={toggleTheme} type="button">
          <span className="material-symbols-outlined sidebar__icon">
            {isLightMode ? 'dark_mode' : 'light_mode'}
          </span>
          {!isCollapsed && <span className="sidebar__text">{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>

        <button className="sidebar__collapse-button" onClick={handleToggle} type="button">
          <span className="material-symbols-outlined sidebar__icon">
            {isCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
          </span>
          {!isCollapsed && <span className="sidebar__text">Collapse</span>}
        </button>

        <div className="sidebar__auth">
          {isLoggedIn ? (
            <Link to="/profile" className="sidebar__auth-link">
              <span className="material-symbols-outlined sidebar__icon">account_circle</span>
              {!isCollapsed && <span className="sidebar__text">Profile</span>}
            </Link>
          ) : (
            <button className="sidebar__auth-button" onClick={handleOpenModal} type="button">
              <span className="material-symbols-outlined sidebar__icon">login</span>
              {!isCollapsed && <span className="sidebar__text">Sign Up/Login</span>}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
