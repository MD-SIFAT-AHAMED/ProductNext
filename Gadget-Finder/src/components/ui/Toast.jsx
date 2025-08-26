"use client";

import React, { useState, useEffect } from "react";

const Toast = ({
  message,
  type = "success",
  duration = 5000,
  onClose,
  position = "top-right",
  showIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      icon: "✅",
      iconBg: "bg-green-100 dark:bg-green-800",
      iconText: "text-green-600 dark:text-green-400",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-200",
      icon: "❌",
      iconBg: "bg-red-100 dark:bg-red-800",
      iconText: "text-red-600 dark:text-red-400",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-800 dark:text-yellow-200",
      icon: "⚠️",
      iconBg: "bg-yellow-100 dark:bg-yellow-800",
      iconText: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      icon: "ℹ️",
      iconBg: "bg-blue-100 dark:bg-blue-800",
      iconText: "text-blue-600 dark:text-blue-400",
    },
  };

  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        fixed z-50 max-w-sm w-full mx-auto
        ${positionStyles[position]}
        ${
          isExiting
            ? "animate-fade-out-up opacity-0 transform translate-y-2"
            : "animate-fade-in-down"
        }
      `}
    >
      <div
        className={`
          ${style.bg} ${style.border} ${style.text}
          border rounded-xl shadow-lg backdrop-blur-sm
          p-4 flex items-start space-x-3
          transform transition-all duration-300 ease-in-out
          hover:shadow-xl
        `}
      >
        {/* Icon */}
        {showIcon && (
          <div
            className={`
              ${style.iconBg} ${style.iconText}
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              text-sm font-medium
            `}
          >
            {style.icon}
          </div>
        )}

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-5">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-600 
            dark:text-gray-500 dark:hover:text-gray-300
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
            focus:ring-gray-500 rounded-md p-1 transition-colors duration-200
          `}
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          className={`
            h-full transition-all ease-linear
            ${
              type === "success"
                ? "bg-green-500"
                : type === "error"
                ? "bg-red-500"
                : type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }
          `}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-out-up {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
        .animate-fade-out-up {
          animation: fade-out-up 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type,
      duration: options.duration || 5000,
      position: options.position || "top-right",
      ...options,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration + 500); // Add extra time for exit animation
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message, options) =>
    addToast(message, "success", options);
  const showError = (message, options) => addToast(message, "error", options);
  const showWarning = (message, options) =>
    addToast(message, "warning", options);
  const showInfo = (message, options) => addToast(message, "info", options);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default Toast;
