import { Navigate } from "react-router-dom";

export default function RequireAuthLogin({children}) {
    const isAuthenticated = localStorage.getItem("Token");  

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children; 
  }
  