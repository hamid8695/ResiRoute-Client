import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useVerify from "../hooks/useVerify";

const PrivateRoute = ({children}) => {
  const user = localStorage.getItem('loginUser');
  const location = useLocation();
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;