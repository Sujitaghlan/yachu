import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || !user.isAdmin) {
      setIsAuthorized(false);
      return false;
    }

    setIsAuthorized(true);
    return true;
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      if (!checkAuth()) {
        navigate("/login", { replace: true });
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthorized(false);
        navigate("/login", { replace: true });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  if (isAuthorized === null) return null; 

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
