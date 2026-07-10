import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import logoWhite from "../../assets/gamenews-logo-white.svg";
import logoMobile from "../../assets/GameNews-mobile-logo.svg";

const Sidebar = ({ isLoggedIn, handleOpenModal }) => {
  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__logo-link">
        <img
          src={logoWhite}
          alt="GameNews Logo"
          className="sidebar__logo sidebar__logo_type_desktop"
        />
        <img
          src={logoMobile}
          alt="GameNews Logo Mobile"
          className="sidebar__logo sidebar__logo_type_mobile"
        />
      </Link>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink to="/search" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">search</span>
              <span className="sidebar__text">Search</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/notifications" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">notifications</span>
              <span className="sidebar__text">Notifications</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/messages" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">mail</span>
              <span className="sidebar__text">Messages</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/discover" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">explore</span>
              <span className="sidebar__text">Discover</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/create" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">add_circle</span>
              <span className="sidebar__text">Create</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/groups" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">group</span>
              <span className="sidebar__text">Groups</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/news" className="sidebar__link">
              <span className="material-symbols-outlined sidebar__icon">newspaper</span>
              <span className="sidebar__text">News</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar__auth">
        {isLoggedIn ? (
          <Link to="/profile" className="sidebar__auth-link">
            <span className="material-symbols-outlined sidebar__icon">account_circle</span>
            <span className="sidebar__text">Profile</span>
          </Link>
        ) : (
          <button className="sidebar__auth-button" onClick={handleOpenModal} type="button">
            <span className="material-symbols-outlined sidebar__icon">login</span>
            <span className="sidebar__text">Sign Up/Login</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
