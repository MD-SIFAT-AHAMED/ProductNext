"use client";

import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ImageLoader = ({
  src,
  alt = "",
  className = "",
  fallbackSrc = null,
  placeholder = null,
  blurDataURL = null,
  onLoad = () => {},
  onError = () => {},
  loadingComponent = null,
  errorComponent = null,
  lazy = true,
  quality = 75,
  sizes = null,
  priority = false,
  ...props
}) => {
  const [imageState, setImageState] = useState("loading");
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy]);

  // Handle image loading
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();

    img.onload = () => {
      setImageState("loaded");
      onLoad();
    };

    img.onerror = () => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setImageState("loading");
      } else {
        setImageState("error");
        onError();
      }
    };

    img.src = currentSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSrc, isInView, fallbackSrc, onLoad, onError]);

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setImageState("loading");
  }, [src]);

  const renderContent = () => {
    switch (imageState) {
      case "loading":
        if (loadingComponent) {
          return loadingComponent;
        }

        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            {blurDataURL ? (
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
                style={{ backgroundImage: `url(${blurDataURL})` }}
              />
            ) : null}
            <div className="relative z-10">
              <LoadingSpinner size="md" variant="primary" />
            </div>
          </div>
        );

      case "error":
        if (errorComponent) {
          return errorComponent;
        }

        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm text-center px-2">Failed to load image</p>
          </div>
        );

      case "loaded":
        return (
          <img
            src={currentSrc}
            alt={alt}
            className={`transition-opacity duration-500 ${className}`}
            style={{ opacity: imageState === "loaded" ? 1 : 0 }}
            {...props}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {placeholder && imageState === "loading" && (
        <div className="absolute inset-0">{placeholder}</div>
      )}
      {renderContent()}
    </div>
  );
};

// Progressive Image Component with blur effect
export const ProgressiveImage = ({
  src,
  alt = "",
  className = "",
  placeholderSrc = null,
  blurAmount = "blur-sm",
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`
          w-full h-full object-cover transition-all duration-700
          ${
            !imageLoaded && placeholderSrc
              ? `${blurAmount} scale-110`
              : "blur-0 scale-100"
          }
        `}
        {...props}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="md" variant="white" />
        </div>
      )}
    </div>
  );
};

// Optimized Image Component with multiple fallbacks
export const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  fallbacks = [],
  category = "default",
  ...props
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [imageState, setImageState] = useState("loading");

  const allSources = [src, ...fallbacks];

  // Category-based fallback images
  const categoryFallbacks = {
    smartphones:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    laptops:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    tablets:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    watches:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    headphones:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    gaming:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    cameras:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    smart_home:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    default:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
  };

  const handleImageError = () => {
    if (currentSrcIndex < allSources.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
      setImageState("loading");
    } else {
      // Use category fallback as final fallback
      const finalFallback =
        categoryFallbacks[category.toLowerCase()] || categoryFallbacks.default;
      if (allSources[currentSrcIndex] !== finalFallback) {
        allSources.push(finalFallback);
        setCurrentSrcIndex((prev) => prev + 1);
        setImageState("loading");
      } else {
        setImageState("error");
      }
    }
  };

  const handleImageLoad = () => {
    setImageState("loaded");
  };

  return (
    <ImageLoader
      src={allSources[currentSrcIndex]}
      alt={alt}
      className={className}
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...props}
    />
  );
};

// Image Gallery Component with lazy loading
export const ImageGallery = ({
  images = [],
  selectedIndex = 0,
  onImageSelect = () => {},
  className = "",
  thumbnailClassName = "",
  mainImageClassName = "",
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className={`relative ${mainImageClassName}`}>
        <ImageLoader
          src={images[selectedIndex]}
          alt={`Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
          onLoad={() => handleImageLoad(selectedIndex)}
          lazy={false}
          priority={true}
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`
                flex-shrink-0 relative overflow-hidden rounded-lg border-2 transition-all duration-200
                ${
                  selectedIndex === index
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }
                ${thumbnailClassName}
              `}
            >
              <ImageLoader
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(index)}
                lazy={index > 3} // Only lazy load thumbnails after the first 4
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
