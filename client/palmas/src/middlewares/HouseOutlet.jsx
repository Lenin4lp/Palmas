import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import HouseBar from "../components/HouseBar";

function HouseOutlet() {
  return (
    <div className=" block">
      <HouseBar />
      <Outlet />
    </div>
  );
}

export default HouseOutlet;
