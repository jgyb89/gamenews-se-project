import React, { useState, useEffect } from 'react';
import './Header.css';

import godot from '../../assets/gallery/godot-game-engine.png';
import globalGameJam from '../../assets/gallery/global-game-jam.png';
import css2 from '../../assets/gallery/major-css2-competition.png';
import valve from '../../assets/gallery/valve.png';
import cssgo from '../../assets/gallery/cssgo.png';
import unreal from '../../assets/gallery/unreal-engine.png';
import valorant from '../../assets/gallery/valorant.png';

const categoryImages = [
  { id: 1, src: godot, alt: "Godot Game Engine" },
  { id: 2, src: globalGameJam, alt: "Global Game Jam" },
  { id: 3, src: css2, alt: "Major CSS2 Competition" },
  { id: 4, src: valve, alt: "Valve" },
  { id: 5, src: cssgo, alt: "CS:GO" },
  { id: 6, src: unreal, alt: "Unreal Engine" },
  { id: 7, src: valorant, alt: "Valorant" }
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    transition: 'transform 0.3s ease'
  };

  return (
    <header className="header">
      <div className="header__carousel-wrapper">
        {currentIndex > 0 && (
          <button className="header__arrow header__arrow--left" onClick={handlePrev} aria-label="Previous category">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="white"/>
            </svg>
          </button>
        )}

        <div className="header__carousel-window">
          <div className="header__carousel-track" style={trackStyle}>
            {categoryImages.map((img) => (
              <div key={img.id} className="header__carousel-item">
                <img src={img.src} alt={img.alt} className="header__carousel-image" />
              </div>
            ))}
          </div>
        </div>

        {currentIndex < categoryImages.length - visibleItems && (
          <button className="header__arrow header__arrow--right" onClick={handleNext} aria-label="Next category">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="white"/>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
