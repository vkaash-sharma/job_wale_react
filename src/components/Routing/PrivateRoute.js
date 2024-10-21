// PrivateRoute.js
import {isLogin} from "_helpers/helper";
import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import jwtAuthService from "../../services/JwtAuthService";

function PrivateRoute() {
  const location = useLocation();
  useEffect(() => {
    if (!isLogin()) {
      localStorage.setItem("redirectPath", location.pathname + location.search);
    }
  }, [location]);
  useEffect(() => {
    if (isLogin()) {
      jwtAuthService.refreshUserJwtToken();
    }
  }, [])
  return isLogin() ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/login" replace />
  );
}

export default PrivateRoute;
