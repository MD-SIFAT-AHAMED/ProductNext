"use client";

import React from "react";

const LoadingSpinner = ({
  size = "md",
  variant = "primary",
  className = "",
  text = "",
  fullScreen = false,
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const variantClasses = {
    primary: "border-blue-600 border-t-transparent",
    secondary: "border-gray-600 border-t-transparent",
    success: "border-green-600 border-t-transparent",
    warning: "border-yellow-600 border-t-transparent",
    danger: "border-red-600 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  const SpinnerComponent = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      {/* Main Spinner */}
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]} 
            ${variantClasses[variant]}
            border-4 rounded-full animate-spin
            ${className}
          `}
        />
        {/* Inner dot for enhanced visual */}
        <div
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${
              size === "xs"
                ? "w-1 h-1"
                : size === "sm"
                ? "w-1.5 h-1.5"
                : size === "md"
                ? "w-2 h-2"
                : size === "lg"
                ? "w-3 h-3"
                : "w-4 h-4"
            }
            ${
              variant === "white"
                ? "bg-white"
                : variant === "primary"
                ? "bg-blue-600"
                : variant === "secondary"
                ? "bg-gray-600"
                : variant === "success"
                ? "bg-green-600"
                : variant === "warning"
                ? "bg-yellow-600"
                : "bg-red-600"
            }
            rounded-full animate-pulse
          `}
        />
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={`
          text-sm font-medium animate-pulse
          ${
            variant === "white"
              ? "text-white"
              : "text-gray-600 dark:text-gray-400"
          }
        `}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <SpinnerComponent />
      </div>
    );
  }

  return <SpinnerComponent />;
};

// Pulse Loader Component
export const PulseLoader = ({
  size = "md",
  variant = "primary",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const variantClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
    white: "bg-white",
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            rounded-full animate-pulse
          `}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  );
};

// Dots Loader Component
export const DotsLoader = ({
  size = "md",
  variant = "primary",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-1 h-1",
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-6 h-6",
  };

  const variantClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
    white: "bg-white",
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            rounded-full animate-bounce
          `}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
};

// Wave Loader Component
export const WaveLoader = ({
  size = "md",
  variant = "primary",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-1 h-4",
    sm: "w-1 h-6",
    md: "w-1 h-8",
    lg: "w-2 h-12",
    xl: "w-2 h-16",
  };

  const variantClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
    white: "bg-white",
  };

  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            rounded-sm animate-pulse
          `}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "1.2s",
            transform: `scaleY(${0.4 + Math.sin(index) * 0.6})`,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
