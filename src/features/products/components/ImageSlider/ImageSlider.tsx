import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ImageSlider.module.scss";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

interface ImageSliderProps {
  images: string[];
  altText?: string;
  interval?: number;
  showNavigation?: boolean;
  showThumbnails?: boolean;
  autoSlide?: boolean;
  slideOnHover?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  altText = "Image",
  interval = 3000,
  showNavigation = true,
  showThumbnails = true,
  autoSlide = true,
  slideOnHover = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 300); // Duration of fade effect in milliseconds
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 300);
  }, [images.length]);

  useEffect(() => {
    let shouldSlide = false;
    if (autoSlide) {
      if (!slideOnHover || isHovered) {
        shouldSlide = true;
      }
    } else if (slideOnHover && isHovered) {
      shouldSlide = true;
    }

    if (shouldSlide) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoSlide, nextSlide, slideOnHover, isHovered, interval]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (slideOnHover && !autoSlide) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetTimeout();
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(false);
    }, 300);
  };

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="slider-container"
    >
      {/* Main Image */}
      <div
        className={`${styles.slide} ${
          showThumbnails ? styles.withThumbnails : ""
        }`}
      >
        <img
          src={images[currentIndex]}
          alt={`${altText} ${currentIndex + 1}`}
          className={`${styles.image} ${fade ? styles.fade : ""}`}
          data-testid="main-image"
        />
      </div>

      {/* Thumbnails and Navigation Buttons */}
      {showThumbnails && images.length > 1 && (
        <div className={styles.thumbnailContainer}>
          {/* Up Button */}
          {showNavigation && (
            <button
              className={`${styles.navButton} ${styles.upButton}`}
              onClick={prevSlide}
              aria-label="Previous Image"
              data-testid="previous-image-button"
            >
              <KeyboardArrowUp fontSize="small" />
            </button>
          )}

          {/* Thumbnails */}
          <div className={styles.thumbnails}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${altText} Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
                data-testid={`thumbnail-${index}`}
              />
            ))}
          </div>

          {/* Down Button */}
          {showNavigation && (
            <button
              className={`${styles.navButton} ${styles.downButton}`}
              onClick={nextSlide}
              aria-label="Next Image"
              data-testid="next-image-button"
            >
              <KeyboardArrowDown fontSize="small" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
