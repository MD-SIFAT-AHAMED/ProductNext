"use client";

import React from "react";

const Skeleton = ({
  className = "",
  variant = "default",
  animation = "shimmer",
  children,
}) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 rounded";

  const animationClasses = {
    shimmer:
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer",
    pulse: "animate-pulse",
    wave: "animate-wave",
    none: "",
  };

  const variantClasses = {
    default: "",
    rounded: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4",
    button: "rounded-lg h-10",
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${animationClasses[animation]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Text Skeleton Component
export const TextSkeleton = ({
  lines = 1,
  className = "",
  animation = "shimmer",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          animation={animation}
          className={`
            ${index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}
            ${index === 0 ? "h-4" : "h-3"}
          `}
        />
      ))}
    </div>
  );
};

// Avatar Skeleton Component
export const AvatarSkeleton = ({
  size = "md",
  className = "",
  animation = "shimmer",
}) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <Skeleton
      variant="circle"
      animation={animation}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

// Card Skeleton Component
export const CardSkeleton = ({
  className = "",
  animation = "shimmer",
  hasImage = true,
  hasAvatar = false,
  textLines = 3,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 ${className}`}
    >
      {/* Image Skeleton */}
      {hasImage && (
        <Skeleton
          animation={animation}
          className="h-48 w-full mb-4 rounded-xl"
        />
      )}

      {/* Header with Avatar */}
      {hasAvatar && (
        <div className="flex items-center space-x-3 mb-4">
          <AvatarSkeleton size="sm" animation={animation} />
          <div className="flex-1">
            <Skeleton animation={animation} className="h-4 w-24 mb-2" />
            <Skeleton animation={animation} className="h-3 w-16" />
          </div>
        </div>
      )}

      {/* Title */}
      <Skeleton animation={animation} className="h-6 w-3/4 mb-3" />

      {/* Text Content */}
      <TextSkeleton lines={textLines} animation={animation} className="mb-4" />

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Skeleton animation={animation} className="h-10 w-24 rounded-lg" />
        <Skeleton animation={animation} className="h-10 w-20 rounded-lg" />
      </div>
    </div>
  );
};

// Product Card Skeleton Component
export const ProductCardSkeleton = ({
  className = "",
  animation = "shimmer",
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {/* Product Image */}
      <Skeleton animation={animation} className="h-48 w-full" />

      <div className="p-6">
        {/* Category Badge */}
        <Skeleton
          animation={animation}
          className="h-6 w-20 rounded-full mb-3"
        />

        {/* Product Name */}
        <Skeleton animation={animation} className="h-6 w-full mb-2" />
        <Skeleton animation={animation} className="h-6 w-3/4 mb-3" />

        {/* Brand */}
        <Skeleton animation={animation} className="h-4 w-24 mb-2" />

        {/* Description */}
        <TextSkeleton lines={2} animation={animation} className="mb-4" />

        {/* Features */}
        <div className="flex space-x-2 mb-4">
          <Skeleton animation={animation} className="h-6 w-16 rounded" />
          <Skeleton animation={animation} className="h-6 w-20 rounded" />
        </div>

        {/* Price and Colors */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton animation={animation} className="h-8 w-20 mb-1" />
            <Skeleton animation={animation} className="h-4 w-16" />
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="circle"
                animation={animation}
                className="w-4 h-4"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// List Item Skeleton Component
export const ListItemSkeleton = ({
  className = "",
  animation = "shimmer",
  hasImage = true,
}) => {
  return (
    <div className={`flex items-center space-x-4 p-4 ${className}`}>
      {hasImage && (
        <Skeleton
          animation={animation}
          className="w-16 h-16 rounded-lg flex-shrink-0"
        />
      )}
      <div className="flex-1">
        <Skeleton animation={animation} className="h-5 w-3/4 mb-2" />
        <Skeleton animation={animation} className="h-4 w-1/2 mb-1" />
        <Skeleton animation={animation} className="h-3 w-1/4" />
      </div>
      <Skeleton animation={animation} className="w-8 h-8 rounded" />
    </div>
  );
};

// Table Skeleton Component
export const TableSkeleton = ({
  rows = 5,
  columns = 4,
  className = "",
  animation = "shimmer",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} animation={animation} className="h-6 flex-1" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              animation={animation}
              className="h-8 flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Page Skeleton Component
export const PageSkeleton = ({ className = "", animation = "shimmer" }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Page Header */}
      <div className="text-center space-y-4">
        <Skeleton animation={animation} className="h-12 w-96 mx-auto" />
        <Skeleton animation={animation} className="h-6 w-2/3 mx-auto" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} animation={animation} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
