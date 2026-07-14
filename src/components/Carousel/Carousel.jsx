import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Carousel.css";

const Carousel = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth <= 768);

      if (currentWidth <= 1424 && currentWidth > 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure currentIndex adjusts if resizing makes it out of bounds
  useEffect(() => {
    if (items.length > 0 && currentIndex > items.length - visibleItems) {
      setCurrentIndex(Math.max(0, items.length - visibleItems));
    }
  }, [visibleItems, items.length, currentIndex]);

  const handleNext = () => {
    if (currentIndex < items.length - visibleItems) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const trackStyle = isMobile
    ? {}
    : {
        transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
        transition: "transform 0.3s ease",
      };

  return (
    <div className="carousel">
      <div className="carousel__header">
        <h2 className="carousel__title">{title}</h2>
        {!isMobile && (
          <div className="carousel__controls">
            <button
              className="carousel__button"
              onClick={handlePrev}
              aria-label="Previous"
              disabled={currentIndex === 0}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="carousel__button"
              onClick={handleNext}
              aria-label="Next"
              disabled={currentIndex >= items.length - visibleItems}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="carousel__window">
        <div className="carousel__track" style={trackStyle}>
          {items.map((item, index) => (
            <div key={item.id || index} className="carousel__item">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
