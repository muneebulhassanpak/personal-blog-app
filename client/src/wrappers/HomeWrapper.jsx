import React from "react";
import Home from "../pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
const HomeWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeWrapper;
