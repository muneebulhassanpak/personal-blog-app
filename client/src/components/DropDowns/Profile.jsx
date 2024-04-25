import React, { useState } from "react";
import { BsTriangleFill, BsPen, BsPersonCircle } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdOutlineDashboardCustomize, MdLogout } from "react-icons/md";
import { Logout as LogoutAction } from "../../store/userSlice";
import { MdOutlineWatchLater } from "react-icons/md";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { successMessage } from "../../URLs/Toasts";
import { ToastContainer } from "react-toastify";
import { imageUrlReturner } from "../shared/sharedCode/FetchProfilePicture";

const Profile = () => {
  const [dropDown, setDropDown] = useState(false);
  const opendModal = () => {
    setDropDown(true);
  };
  const closedModal = () => {
    setDropDown(false);
  };
  const toggledModal = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <>
      <li className="relative text-center ">
        <button onClick={toggledModal}>
          {imageUrlReturner() != "" ? (
            <img
              src={`http://localhost:3002/${imageUrlReturner()}`}
              className="w-8 h-8 rounded-full object-cover inline-block"
            />
          ) : (
            <BsPersonCircle className="inline-block text-2xl" />
          )}

          {
            <AiOutlineCaretDown
              className={`inline-block mt-1 text-xs ease-in-out transition-all ${
                dropDown && "rotate-180"
              }`}
            />
          }
        </button>
        {dropDown && <DropDown />}
      </li>
    </>
  );
};

const DropDown = () => {
  //Logout Logic
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Cookies.remove("access_token");
    dispatch(LogoutAction());
    successMessage("You are logged out");
  };
  return (
    <>
      <ul className="bg-white py-3 list-none static sm:absolute -right-2 top-12 w-auto sm:w-36 text-left sm:shadow-lg ">
        <BsTriangleFill className="absolute right-0 -top-4 text-white text-3xl" />
        <li className="hover:bg-gray-200 px-2 py-1">
          <Link to="/dashboard" className="block">
            <MdOutlineDashboardCustomize className="inline-block mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <Link to="/dashboard/write" className="block">
            <BsPen className="inline-block mr-2" />
            Write
          </Link>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <Link to="/dashboard/saved" className="block">
            <MdOutlineWatchLater className="inline-block mr-2" />
            Saved Posts
          </Link>
        </li>
        <li className="hover:bg-gray-200 px-2 py-1">
          <button onClick={logoutHandler}>
            <MdLogout className="inline-block mr-2" />
            Logout
          </button>
        </li>
      </ul>
      <ToastContainer />
    </>
  );
};

export default Profile;
