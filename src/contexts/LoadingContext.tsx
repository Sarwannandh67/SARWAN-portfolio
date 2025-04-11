import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LoadingPage from "../components/ui/LoadingPage.tsx";
import AdvancedLoadingPage from "../components/ui/AdvancedLoadingPage";

interface LoadingContextType {
  isLoading: boolean;
  isAdvancedLoading: boolean;
  loadingMessage: string;
  loadingProgress?: number;
  showLoading: (message: string, timeout?: number) => void;
  showAdvancedLoading: (message: string, progress?: number, timeout?: number) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdvancedLoading, setIsAdvancedLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
const [loadingProgress, setLoadingProgress] = useState<number | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setIsLoading(false);
      setIsAdvancedLoading(false);
      setLoadingProgress(undefined);
    };
  }, [timeoutId]);

  const showLoading = (message: string, timeout?: number) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setLoadingMessage(message);
    setIsLoading(true);
    if (timeout) {
      const id = setTimeout(() => {
        hideLoading();
      }, timeout);
      setTimeoutId(id);
    }
  };

  const showAdvancedLoading = (message: string, progress?: number, timeout?: number) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setLoadingMessage(message);
    setLoadingProgress(progress);
    setIsAdvancedLoading(true);
    if (timeout) {
      const id = setTimeout(() => {
        hideLoading();
      }, timeout);
      setTimeoutId(id);
    }
  };

  const hideLoading = () => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setIsLoading(false);
    setIsAdvancedLoading(false);
    setLoadingProgress(undefined);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isAdvancedLoading,
        loadingMessage,
        loadingProgress,
        showLoading,
        showAdvancedLoading,
        hideLoading,
      }}
    >
      {children}
      {isLoading && <LoadingPage message={loadingMessage} />}
      {isAdvancedLoading && (
        <AdvancedLoadingPage
          message={loadingMessage}
          progress={loadingProgress}
        />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};