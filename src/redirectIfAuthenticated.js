import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  const isAuthenticated = localStorage.getItem("Token");  

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children; 
}
