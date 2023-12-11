import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useVerify from "../hooks/useVerify";

const PrivateRoute = ({children}) => {
  const [token]=useVerify();
 
  const location = useLocation();
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;