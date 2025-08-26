"use client";

import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Sign in with Google using NextAuth
      const result = await signIn("google", {
        redirect: false, // Don't redirect automatically
        callbackUrl: "/Products", // Redirect to products page after successful login
      });

      if (result?.error) {
        setError("Failed to sign in with Google. Please try again.");
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        // Check if session was created successfully
        const session = await getSession();
        if (session) {
          console.log("Successfully signed in:", session.user);
          // Redirect to products page
          router.push("/Products");
          router.refresh(); // Refresh to update the UI
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={`
          w-full flex items-center justify-center space-x-3 px-6 py-4 
          rounded-xl font-semibold text-base transition-all duration-300 
          transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
          bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white
          disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
          focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-offset-2
          focus:ring-offset-white dark:focus:ring-offset-gray-900
          shadow-md hover:shadow-xl
        `}
        style={{
          boxShadow: isLoading ? "inset 0 2px 4px rgba(0,0,0,0.1)" : undefined,
        }}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            <FaGoogle className="text-xl" />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {/* Divider with "or" text */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
            Secure Google Authentication
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Secure Authentication
            </h4>
            <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
              Your Google account information is securely handled and we only
              access basic profile information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
