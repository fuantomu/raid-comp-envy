/** @jsxImportSource @emotion/react */
import { Component, ErrorInfo, ReactNode } from "react";
import { AppErrorId } from "../../consts";

import ErrorPage from "../../pages/ErrorPage";
import AppError from "../../utils/AppError";
import { ErrorBoundaryProvider } from "./context";

type ErrorType = Error | AppError;

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error?: ErrorType;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromError(error: ErrorInfo) {
    return { error };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: ErrorType, errorInfo: ErrorInfo) {
    // TODO: Track error
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ error: undefined });
  };

  renderChildren() {
    const { error } = this.state;

    // If we have an error, work out what it is and how to show it
    if (error) {
      const err = error instanceof AppError ? error : new AppError(AppErrorId.Unspecific);
      return <ErrorPage error={err} />;
    }

    // If we have no error, render children
    return this.props.children;
  }

  render() {
    return (
      <ErrorBoundaryProvider value={{ reset: this.handleReset }}>
        {this.renderChildren()}
      </ErrorBoundaryProvider>
    );
  }
}

export default ErrorBoundary;
