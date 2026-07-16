import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Carousel.css";
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";

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

  // Ensure currentIndex adjusts if resizing makes it out of bounds during render
  const maxIndex = Math.max(0, items.length - visibleItems);
  if (items.length > 0 && currentIndex > maxIndex) {
    setCurrentIndex(maxIndex);
  }

  const handleNext = () => {
    if (currentIndex < maxIndex) {
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
              <img src={arrowLeft} alt="Previous" className="carousel__arrow" />
            </button>
            <button
              className="carousel__button"
              onClick={handleNext}
              aria-label="Next"
              disabled={currentIndex >= items.length - visibleItems}
            >
              <img src={arrowRight} alt="Next" className="carousel__arrow" />
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
