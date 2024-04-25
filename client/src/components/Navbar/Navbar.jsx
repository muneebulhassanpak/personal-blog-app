import React, { useState } from "react";
import Spacer from "../../wrappers/Spacer";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button, { SecondaryButton } from "../shared/button/button";
import Book from "../../assets/book.png";
import Signin from "../../modals/Signin";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import Signup from "../../modals/Signup";
import Profile from "../DropDowns/Profile";

const activeClassName =
  "border-b border-gray-700 inline-block py-2 font-medium";
const normalClassName = "inline-block py-2 font-medium";

const Navbar = () => {
  // Signup/signin modal
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  //hamburger menu state
  const [popUp, setPopup] = useState(false);
  const togglePopup = () => {
    setPopup((prev) => !prev);
  };
  //Sign up modal logic
  const [sModal, setSModal] = useState(false);
  const opensModal = () => {
    setSModal(true);
  };
  const closesModal = () => {
    setSModal(false);
  };

  // Redux store's logic
  const loggedIn = useSelector((store) => store?.user?.isLoggedIn);

  return (
    <>
      <header className="bg-pale-yellow sticky top-0 border-b border-black z-10 ">
        <Spacer>
          <div className="w-1/4 md:w-2/4">
            <NavLink to="/">
              <img src={Book} alt="Logo" className="w-10 h-auto" />
            </NavLink>
          </div>
          <nav className="hidden sm:block sm:w-3/4 md:w-2/4">
            <ul className="flex flex-col sm:flex-row justify-between items-center bg-white sm:bg-inherit h-full sm:h-auto py-5 sm:py-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClassName : normalClassName
                  }
                >
                  Home
                </NavLink>
              </li>
              {loggedIn && (
                <li>
                  <NavLink
                    to="/dashboard/write"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalClassName
                    }
                  >
                    Write
                  </NavLink>
                </li>
              )}
              {!loggedIn && (
                <>
                  <li>
                    <SecondaryButton onClick={opensModal}>
                      Sign Up
                    </SecondaryButton>
                  </li>
                  <li>
                    <Button onClick={toggleModal}>Sign In</Button>
                  </li>
                </>
              )}
              {loggedIn && <Profile />}
            </ul>
          </nav>

          <nav
            className={`absolute ${
              popUp ? "top-0" : "top-[-400px]"
            }  left-0 right-0 h-[60vh] sm:h-auto ease-in-out duration-200 bg-white sm:hidden w-full sm:static sm:w-3/4 md:w-2/4 shadow-lg`}
          >
            <GrClose
              className="sm:hidden text-xl absolute right-3 top-5"
              onClick={togglePopup}
            />
            <ul className="flex flex-col sm:flex-row justify-between items-center bg-white sm:bg-inherit h-full sm:h-auto py-12 sm:py-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClassName : normalClassName
                  }
                >
                  Home
                </NavLink>
              </li>
              {loggedIn && (
                <li>
                  <NavLink
                    to="/dashboard/write"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalClassName
                    }
                  >
                    Write
                  </NavLink>
                </li>
              )}
              {!loggedIn && (
                <>
                  <li>
                    <SecondaryButton onClick={opensModal}>
                      Sign Up
                    </SecondaryButton>
                  </li>
                  <li>
                    <Button onClick={toggleModal}>Sign In</Button>
                  </li>
                </>
              )}
              {loggedIn && <Profile />}
            </ul>
          </nav>

          <RxHamburgerMenu
            className="sm:hidden text-2xl"
            onClick={togglePopup}
          />
        </Spacer>
      </header>
      {modal && <Signin closeModal={closeModal} />}
      {sModal && <Signup close={closesModal} />}
    </>
  );
};

export default Navbar;
