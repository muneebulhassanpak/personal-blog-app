import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineFolderCopy } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import UserProfile from "./UserProfile";
import { NavLink } from "react-router-dom";
import UpdateProfile from "../../modals/UpdateProfilePicture";
import { imageUrlReturner } from "../shared/sharedCode/FetchProfilePicture";

const inactiveClassNames = ` py-3 flex justify-start md:px-[5%] lg:px-[10%] xl:px-[20%] w-full hover:bg-gray-300`;
const activeClassNames = `${inactiveClassNames} bg-gray-500 hover:bg-gray-500 text-white`;
const inactiveClassNamesSM = ` py-2 flex items-center justify-start px-[20%] hover:bg-gray-300`;
const activeClassNamesSM = `${inactiveClassNamesSM} bg-gray-500 hover:bg-gray-500 text-white`;

const ReadDrawer = (props) => {
  const [pictureModal, setPictureModal] = useState(false);
  const closePictureModal = () => {
    setPictureModal(false);
  };
  const openPictureModal = () => {
    setPictureModal(true);
  };

  const [profileModal, setProfileModal] = useState(false);
  const closeProfileModal = () => {
    setProfileModal(false);
  };
  const openProfileModal = () => {
    setProfileModal(true);
  };

  //Username extraction
  const username = useSelector((store) => store?.user?.user?.username);
  return (
    <>
      <div
        className={`hidden md:flex flex-col justify-center items-center py-6  h-screen  ${props.className} bg-white`}
      >
        <div className="h-1/4 flex flex-col items-center justify-center">
          <div className=" flex flex-col items-center justify-center">
            <button onClick={openPictureModal}>
              {imageUrlReturner() != "" ? (
                <img
                  src={`http://localhost:3002/${imageUrlReturner()}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="text-4xl" />
              )}
            </button>
            <h3 className="mt-1 font-jak">
              Hi! <span className="font-cos">{username ? username : ""}</span>
            </h3>
          </div>
        </div>
        <div className="h-2/4 w-full  flex-shrink-0 flex flex-col justify-evenly items-start">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? activeClassNames : inactiveClassNames
            }
          >
            <BiHomeAlt className="text-2xl inline-block" />
            <span className="inline-block ml-1">Dashboard</span>
          </NavLink>
          <NavLink
            to="/dashboard/saved"
            className={({ isActive }) =>
              isActive ? activeClassNames : inactiveClassNames
            }
          >
            <MdOutlineFolderCopy className="text-2xl " />
            <span className="inline-block ml-1">Saved</span>
          </NavLink>
          <NavLink
            to="/dashboard/write"
            className={({ isActive }) =>
              isActive ? activeClassNames : inactiveClassNames
            }
          >
            <BsPencilSquare className="text-2xl " />
            <span className="inline-block ml-1">Write</span>
          </NavLink>
        </div>
        <div
          className="h-1/4  flex flex-col justify-center"
          onClick={openProfileModal}
        >
          <UserProfile />
        </div>
      </div>

      <div
        className={`fixed transition-all flex md:hidden flex-col justify-center items-center py-6 z-50 shadow-xl  h-full  bg-white top-0 ${props.className}`}
      >
        <div className="h-1/4 w-full px-4 flex flex-col justify-center ">
          <button>
            <AiOutlineClose
              className="text-xl absolute right-4 top-4"
              onClick={props.closeDrawer}
            />
          </button>
          <div className="w-full flex flex-col items-center justify-center border-b pb-3">
            <button onClick={openPictureModal}>
              <BsPersonCircle className="text-4xl" />
            </button>
          </div>
        </div>
        <div className="h-2/4 w-full  flex-shrink-0 flex flex-col justify-evenly ">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? activeClassNamesSM : inactiveClassNamesSM
            }
          >
            <BiHomeAlt className="text-2xl inline-block" />
            <span className="inline-block ml-1">Dashboard</span>
          </NavLink>
          <NavLink
            to="/dashboard/saved"
            className={({ isActive }) =>
              isActive ? activeClassNamesSM : inactiveClassNamesSM
            }
          >
            <MdOutlineFolderCopy className="text-2xl " />
            <span className="inline-block ml-1">Saved</span>
          </NavLink>
          <NavLink
            to="/dashboard/write"
            className={({ isActive }) =>
              isActive ? activeClassNamesSM : inactiveClassNamesSM
            }
          >
            <BsPencilSquare className="text-2xl " />
            <span className="inline-block ml-1">Write</span>
          </NavLink>
        </div>
        <div
          className="h-1/4 w-full px-4  flex flex-col justify-center"
          onClick={openProfileModal}
        >
          <UserProfile />
        </div>
      </div>
      {pictureModal && (
        <UpdateProfile closeModal={closePictureModal} type="picture" />
      )}
      {profileModal && (
        <UpdateProfile closeModal={closeProfileModal} type="content" />
      )}
    </>
  );
};

export default ReadDrawer;
