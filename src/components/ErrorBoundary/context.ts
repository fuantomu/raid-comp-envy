import { createContext, useContext } from "react";

type ErrorBoundaryApi = { reset: () => void };

const ErrorBoundaryContext = createContext<ErrorBoundaryApi | null>(null);

export const ErrorBoundaryProvider = ErrorBoundaryContext.Provider;

export const useErrorBoundary = () => useContext(ErrorBoundaryContext);
