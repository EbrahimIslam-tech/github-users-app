import React from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }
  if (user.email) {
    return children;
  }
  return <useNavigate to="login" state={{ from: location }} />;
};

export default PrivateRoute;
