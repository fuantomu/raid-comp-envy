/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useErrorBoundary } from "../../components/ErrorBoundary/context";

export interface ErrorPageProps {
  error: Error;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const errorBoundary = useErrorBoundary();

  return <>{JSON.stringify(error)}</>;
};

export default ErrorPage;
