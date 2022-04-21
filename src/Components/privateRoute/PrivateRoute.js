import React from "react";
import { Spinner } from "react-bootstrap";

import { Navigate, useLocation} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  // const navigate =useNavigate()
  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
