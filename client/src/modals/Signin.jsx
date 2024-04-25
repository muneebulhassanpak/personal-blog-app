import React, { useState, useRef } from "react";
import { AiOutlineMail, AiOutlineClose } from "react-icons/ai";
import Button from "../components/shared/button/button";
import { login } from "../URLs/Urls";
import { successMessage, failureMessage } from "../URLs/Toasts";
import { Login as loginAction } from "../store/userSlice.js";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const Signin = (props) => {
  //Dispatching logic
  const dispatch = useDispatch();

  //Sign in form logic
  const signinEmailRef = useRef();
  const signinPassRef = useRef();
  const signinFormCollectionHandler = (e) => {
    e.preventDefault();
    const email = signinEmailRef.current.value;
    const password = signinPassRef.current.value;
    if (!email || !password) {
      return;
    }
    //Fetch used
    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((user) => {
        user.success == true &&
          dispatch(loginAction(user.user)) &&
          successMessage("Successful login");
        user.success == false && failureMessage("Incorrect credentials");
      });
  };

  return (
    <>
      <div
        onClick={props.closeModal}
        className="fixed left-0 right-0 top-0 bottom-0 w-full z-50 h-full bg-gray-900/75 grid place-items-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white py-8 px-2 relative w-signin-modal-width md:w-[450px] h-[90vh]flex justify-center items-center"
        >
          <AiOutlineClose
            className="absolute right-4 top-4 hover:cursor-pointer text-xl"
            onClick={props.closeModal}
          />

          <div className="text-center max-w-[80%] mx-auto ">
            <h1 className="text-3xl font-cos font-medium text-center my-4">
              Sign in with email
            </h1>

            <form action="" onSubmit={signinFormCollectionHandler}>
              <span className="block text-center font-bold">Email</span>
              <input
                type="email"
                ref={signinEmailRef}
                required
                name="email"
                className="block text-sm w-full border-b border-black my-1 focus:border-dark-green focus:outline-none focus:border-b-2  bg-transparent"
              />
              <span className="block text-center mt-4 font-bold">Password</span>
              <input
                ref={signinPassRef}
                type="password"
                required
                name="password"
                className="block text-sm  w-full border-b border-black mt-1 mb-3 focus:border-dark-green focus:outline-none focus:border-b-2 focus:bg-white"
              />
              <Button className=" inline-block">Login</Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
