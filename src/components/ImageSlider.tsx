import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, CardMedia, Stack, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface ImageSliderProps {
  images: string[];
  altText?: string;
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  altText = 'Product Image',
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Automatic sliding effect with fade-out and fade-in
  useEffect(() => {
    resetTimeout();

    // Start fade-out
    timeoutRef.current = setTimeout(() => {
      // Fade-out duration
      const fadeOutDuration = 500;

      // Trigger fade-out by setting opacity to 0
      const fadeOutElement = document.getElementById('main-image');
      if (fadeOutElement) {
        fadeOutElement.style.opacity = '0';
      }

      // After fade-out, change image and fade-in
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );

        const fadeInElement = document.getElementById('main-image');
        if (fadeInElement) {
          fadeInElement.style.opacity = '1';
        }
      }, fadeOutDuration);
    }, interval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length, interval]);

  const goToPrevious = () => {
    resetTimeout();

    // Fade-out
    const fadeOutDuration = 500;
    const fadeOutElement = document.getElementById('main-image');
    if (fadeOutElement) {
      fadeOutElement.style.opacity = '0';
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );

      // Fade-in
      const fadeInElement = document.getElementById('main-image');
      if (fadeInElement) {
        fadeInElement.style.opacity = '1';
      }
    }, fadeOutDuration);
  };

  const goToNext = () => {
    resetTimeout();

    // Fade-out
    const fadeOutDuration = 500;
    const fadeOutElement = document.getElementById('main-image');
    if (fadeOutElement) {
      fadeOutElement.style.opacity = '0';
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );

      // Fade-in
      const fadeInElement = document.getElementById('main-image');
      if (fadeInElement) {
        fadeInElement.style.opacity = '1';
      }
    }, fadeOutDuration);
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    resetTimeout();

    // Fade-out
    const fadeOutDuration = 500;
    const fadeOutElement = document.getElementById('main-image');
    if (fadeOutElement) {
      fadeOutElement.style.opacity = '0';
    }

    setTimeout(() => {
      setCurrentIndex(index);

      // Fade-in
      const fadeInElement = document.getElementById('main-image');
      if (fadeInElement) {
        fadeInElement.style.opacity = '1';
      }
    }, fadeOutDuration);
  };

  const getBorderColor = (isActive: boolean) => {
    if (isActive) {
      return theme.palette.mode === 'light'
        ? theme.palette.grey[800]
        : theme.palette.grey[100];
    } else {
      return theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Main Image */}
      <CardMedia
        id="main-image"
        component="img"
        image={images[currentIndex]}
        alt={`${altText} ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'opacity 0.5s ease-in-out',
          opacity: 1,
        }}
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <IconButton
            onClick={goToPrevious}
            aria-label="Previous Image"
            sx={{
              position: 'absolute',
              top: '50%',
              left: 10,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={goToNext}
            aria-label="Next Image"
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mt: 2,
            mb: 1,
            overflowX: 'auto',
            justifyContent: 'center',
            width: '100%',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                border: `2px solid ${getBorderColor(index === currentIndex)}`,
                cursor: 'pointer',
                borderRadius: 0,
                flexShrink: 0,
                '&:hover': {
                  borderColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[800]
                    : theme.palette.grey[100],
                },
                transition: 'border-color 0.3s',
                width: {
                  xs: '40px',
                  sm: '50px',
                  md: '60px',
                },
                height: 'auto',
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`${altText} Thumbnail ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 0,
                }}
              />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ImageSlider;