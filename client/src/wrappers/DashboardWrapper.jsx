import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ReadDrawer from "../components/ReadDrawer/ReadDrawer";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
const DashboardWrapper = () => {
  const [sideBar, setSideBar] = useState(false);
  const openSideBar = () => {
    setSideBar(true);
  };
  const closeSideBar = () => {
    setSideBar(false);
  };
  return (
    <>
      <section className="hidden md:flex">
        <ReadDrawer className="w-[150px] md:w-2/12 md:sticky md:top-0" />
        <div className="w-[calc(100%-150px)] md:w-10/12  border-l border-gray-400">
          <div className="p-4 flex justify-end bg-white sticky top-0 z-20">
            <NavLink
              to="/"
              className="flex items-center bg-pale-yellow  text-black pl-2 py-1 pr-3 rounded-full text-base  mr-2 "
            >
              <BiArrowBack className=" mr-1" />
              <span className=" text-center">Home</span>
            </NavLink>
            <NavLink
              to="/read"
              className="text-white  bg-black py-1 px-3 rounded-full text-base"
            >
              <span className=" text-center">Read</span>
            </NavLink>
          </div>
          <Outlet />
        </div>
      </section>
      <section className="md:hidden">
        <div className="p-4 bg-pale-yellow flex justify-between items-center sticky top-0 z-50">
          <HiOutlineMenuAlt1 className="text-3xl" onClick={openSideBar} />
          <div className="flex">
            <NavLink
              to="/"
              className="flex items-center bg-black text-white pl-1 py-1 pr-3 rounded-full text-base mr-1"
            >
              <BiArrowBack className=" mr-1" />
              <span className=" text-center">Home</span>
            </NavLink>
            <NavLink
              to="/read"
              className=" flex items-center bg-white text-black px-3 py-1 rounded-full text-base"
            >
              <span className=" text-center">Read</span>
            </NavLink>
          </div>
        </div>

        <ReadDrawer
          className={`${sideBar ? "left-[0px]" : "left-[-400px]"} w-[200px] `}
          closeDrawer={closeSideBar}
        />

        <div className="border-gray-300">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default DashboardWrapper;
