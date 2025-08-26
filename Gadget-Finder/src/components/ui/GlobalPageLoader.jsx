"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const GlobalPageLoader = ({
  showLoader = true,
  delay = 100,
  minDuration = 500,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!showLoader) return;

    let timeoutId;
    let progressInterval;
    let minDurationTimeout;
    const startTime = Date.now();

    // Start loading with delay
    timeoutId = setTimeout(() => {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 100);

      // Ensure minimum duration
      minDurationTimeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 200);
      }, minDuration);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      clearTimeout(minDurationTimeout);
      setIsLoading(false);
      setProgress(0);
    };
  }, [pathname, showLoader, delay, minDuration]);

  if (!isLoading) return null;

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Full Screen Overlay */}
      <div
        className={`
        fixed inset-0 z-[9998] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
        flex items-center justify-center transition-opacity duration-300
        ${className}
      `}
      >
        <div className="text-center">
          <LoadingSpinner size="lg" variant="primary" text="Loading..." />

          {/* Loading Text Animation */}
          <div className="mt-4 flex items-center justify-center space-x-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Loading
            </span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </>
  );
};

// Route Loading Component
export const RouteLoader = ({
  isLoading = false,
  message = "Loading page...",
  className = "",
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={`
      fixed inset-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
      flex items-center justify-center transition-all duration-300
      ${className}
    `}
    >
      <div className="text-center">
        <div className="relative">
          {/* Animated Logo/Icon */}
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-pulse" />
            <div className="absolute inset-2 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-4 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {message}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
};

// Component Loading Wrapper
export const ComponentLoader = ({
  isLoading = false,
  children,
  fallback = null,
  className = "",
  spinnerSize = "md",
  spinnerVariant = "primary",
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        {fallback || (
          <LoadingSpinner
            size={spinnerSize}
            variant={spinnerVariant}
            text="Loading content..."
          />
        )}
      </div>
    );
  }

  return children;
};

// Lazy Loading Wrapper
export const LazyWrapper = ({
  children,
  fallback = null,
  className = "",
  delay = 0,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return (
      <div className={`animate-pulse ${className}`}>
        {fallback || (
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size="md" variant="primary" />
          </div>
        )}
      </div>
    );
  }

  return children;
};

// Section Loading Component
export const SectionLoader = ({
  isLoading = false,
  title = "Loading Section",
  description = "Please wait while we load this content",
  className = "",
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={`
      bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700
      p-8 text-center ${className}
    `}
    >
      <div className="mb-6">
        <div className="w-12 h-12 mx-auto mb-4 relative">
          <div className="absolute inset-0 border-3 border-gray-200 dark:border-gray-600 rounded-full" />
          <div className="absolute inset-0 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>

      {/* Loading Animation */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalPageLoader;
