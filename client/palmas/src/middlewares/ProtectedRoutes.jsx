import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SideBar from "../components/SideBar";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoutes;
