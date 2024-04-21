import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function SuperAdminRoutes() {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    if (user.role_id === 1) {
      return (
        <div>
          <Outlet />
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
}

export default SuperAdminRoutes;
