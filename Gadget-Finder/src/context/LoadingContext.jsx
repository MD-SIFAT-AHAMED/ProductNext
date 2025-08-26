"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();

  // Handle page transitions
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Set loading state for a specific component/operation
  const setLoading = useCallback((key, isLoading, options = {}) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: {
        isLoading,
        message: options.message || "Loading...",
        progress: options.progress || 0,
        timestamp: Date.now(),
      },
    }));
  }, []);

  // Get loading state for a specific component/operation
  const getLoading = useCallback(
    (key) => {
      return (
        loadingStates[key] || { isLoading: false, message: "", progress: 0 }
      );
    },
    [loadingStates]
  );

  // Check if any component is loading
  const isAnyLoading = useCallback(() => {
    return (
      Object.values(loadingStates).some((state) => state.isLoading) ||
      globalLoading
    );
  }, [loadingStates, globalLoading]);

  // Clear loading state for a specific component
  const clearLoading = useCallback((key) => {
    setLoadingStates((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  }, []);

  // Clear all loading states
  const clearAllLoading = useCallback(() => {
    setLoadingStates({});
    setGlobalLoading(false);
  }, []);

  // Set global loading state
  const setGlobalLoadingState = useCallback(
    (isLoading, message = "Loading...") => {
      setGlobalLoading(isLoading);
      if (isLoading) {
        setLoading("global", true, { message });
      } else {
        clearLoading("global");
      }
    },
    [setLoading, clearLoading]
  );

  // Async operation wrapper with loading state
  const withLoading = useCallback(
    async (key, asyncOperation, options = {}) => {
      try {
        setLoading(key, true, options);
        const result = await asyncOperation();
        return result;
      } catch (error) {
        throw error;
      } finally {
        setLoading(key, false);
      }
    },
    [setLoading]
  );

  // Progress updater for long operations
  const updateProgress = useCallback((key, progress, message) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        progress,
        message: message || prev[key]?.message || "Loading...",
      },
    }));
  }, []);

  const value = {
    // State
    loadingStates,
    globalLoading,
    pageLoading,

    // Actions
    setLoading,
    getLoading,
    clearLoading,
    clearAllLoading,
    setGlobalLoadingState,
    withLoading,
    updateProgress,

    // Utilities
    isAnyLoading,
    isLoading: (key) => getLoading(key).isLoading,
    getProgress: (key) => getLoading(key).progress,
    getMessage: (key) => getLoading(key).message,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

// HOC for components that need loading state
export const withLoadingState = (WrappedComponent, defaultKey) => {
  return function LoadingStateComponent(props) {
    const { setLoading, getLoading, clearLoading } = useLoading();
    const loadingKey = props.loadingKey || defaultKey || WrappedComponent.name;

    const loadingProps = {
      setLoading: (isLoading, options) =>
        setLoading(loadingKey, isLoading, options),
      isLoading: getLoading(loadingKey).isLoading,
      loadingMessage: getLoading(loadingKey).message,
      loadingProgress: getLoading(loadingKey).progress,
      clearLoading: () => clearLoading(loadingKey),
    };

    return <WrappedComponent {...props} {...loadingProps} />;
  };
};

// Hook for API calls with loading state
export const useApiCall = (key) => {
  const { setLoading, withLoading } = useLoading();

  const apiCall = useCallback(
    async (asyncOperation, options = {}) => {
      return withLoading(key, asyncOperation, options);
    },
    [key, withLoading]
  );

  const setApiLoading = useCallback(
    (isLoading, options = {}) => {
      setLoading(key, isLoading, options);
    },
    [key, setLoading]
  );

  return { apiCall, setApiLoading };
};

// Hook for image loading state
export const useImageLoading = () => {
  const [imageStates, setImageStates] = useState({});

  const setImageLoading = useCallback((src, isLoading) => {
    setImageStates((prev) => ({
      ...prev,
      [src]: isLoading,
    }));
  }, []);

  const isImageLoading = useCallback(
    (src) => {
      return imageStates[src] || false;
    },
    [imageStates]
  );

  const clearImageLoading = useCallback((src) => {
    setImageStates((prev) => {
      const newState = { ...prev };
      delete newState[src];
      return newState;
    });
  }, []);

  return {
    setImageLoading,
    isImageLoading,
    clearImageLoading,
    imageStates,
  };
};

// Hook for component mounting loading state
export const useMountLoading = (duration = 300) => {
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounting(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isMounting;
};

// Hook for data fetching with loading state
export const useDataFetch = (key, fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { setLoading, getLoading } = useLoading();

  const isLoading = getLoading(key).isLoading;

  const fetchData = useCallback(async () => {
    try {
      setLoading(key, true, { message: "Fetching data..." });
      setError(null);
      const result = await fetchFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  }, [key, fetchFunction, setLoading]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    refetch,
    setData,
  };
};

export default LoadingContext;
