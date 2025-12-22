import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.warn("[Auth] No token found. Redirecting to login.");
    return <Navigate to="/" replace />;
  }

  return children;
}
