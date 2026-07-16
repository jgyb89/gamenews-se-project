import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

import gameNewsLogo from "../../images/gamenews-logo-white.svg";
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";

import godot from "../../images/gallery/godot-game-engine.png";
import globalGameJam from "../../images/gallery/global-game-jam.png";
import css2 from "../../images/gallery/major-css2-competition.png";
import valve from "../../images/gallery/valve.png";
import cssgo from "../../images/gallery/cssgo.png";
import unreal from "../../images/gallery/unreal-engine.png";
import valorant from "../../images/gallery/valorant.png";

const categoryImages = [
  { id: 1, src: godot, alt: "Godot Game Engine" },
  { id: 2, src: globalGameJam, alt: "Global Game Jam" },
  { id: 3, src: css2, alt: "Major CSS2 Competition" },
  { id: 4, src: valve, alt: "Valve" },
  { id: 5, src: cssgo, alt: "CS:GO" },
  { id: 6, src: unreal, alt: "Unreal Engine" },
  { id: 7, src: valorant, alt: "Valorant" },
];

const bottomNavItems = [
  { path: "/search", icon: "search", title: "Search" },
  { path: "/discover", icon: "explore", title: "Discover" },
  { path: "/create", icon: "add_circle", title: "Create" },
  { path: "/groups", icon: "group", title: "Groups" },
  { path: "/news", icon: "newspaper", title: "News" },
];

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setVisibleItems(2);
      } else if (width <= 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < categoryImages.length - visibleItems) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const trackStyle = {
    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
    transition: "transform 0.3s ease",
  };

  return (
    <header className="header">
      {/* Mobile Top Bar */}
      <div className="header__top-bar mobile-only">
        <Link to="/" className="header__logo-link">
          <img
            src={gameNewsLogo}
            alt="GameNews Logo Mobile"
            className="header__logo"
          />
        </Link>
        <div className="header__top-bar-icons">
          <button
            className="header__icon-button"
            type="button"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            className="header__icon-button"
            type="button"
            aria-label="Messages"
          >
            <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      </div>

      <div className="header__carousel-wrapper">
        {currentIndex > 0 && (
          <button
            className="header__arrow header__arrow--left"
            onClick={handlePrev}
            aria-label="Previous category"
          >
            <img src={arrowLeft} alt="Previous category" />
          </button>
        )}

        <div className="header__carousel-window">
          <div className="header__carousel-track" style={trackStyle}>
            {categoryImages.map((img) => (
              <div key={img.id} className="header__carousel-item">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="header__carousel-image"
                />
              </div>
            ))}
          </div>
        </div>

        {currentIndex < categoryImages.length - visibleItems && (
          <button
            className="header__arrow header__arrow--right"
            onClick={handleNext}
            aria-label="Next category"
          >
            <img src={arrowRight} alt="Next category" />
          </button>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav mobile-only">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `bottom-nav__link ${isActive ? "active" : ""}`
            }
          >
            <span className="material-symbols-outlined bottom-nav__icon">
              {item.icon}
            </span>
            <span className="bottom-nav__text">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
