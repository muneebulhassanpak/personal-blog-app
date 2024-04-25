import React, { useRef } from "react";
import { AiOutlineMail, AiOutlineClose } from "react-icons/ai";
import Button from "../components/shared/button/button";
import { failureMessage, successMessage } from "../URLs/Toasts";
import { ToastContainer, toast } from "react-toastify";
import { createUser } from "../URLs/Urls";

const Signup = (props) => {
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  //Form data collection
  const returnFormData = () => {
    const fullname = fullNameRef.current.value.trim();
    const username = userNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    if (!fullname || !username || !email || !password) {
      failureMessage("Please fill form");
      return false;
    }
    return { fullname, username, email, password };
  };
  //const formDataCollection
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = returnFormData();
    if (formData == false) return;
    console.log(formData);
    try {
      const response = await fetch(createUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      data.success == true && successMessage("User created successfully");
      data.success == false && failureMessage("Error creating user");
      setTimeout(() => {
        props.close();
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bottom-0 bg-gray-900/75 z-50 grid place-items-center"
        onClick={props.close}
      >
        <div
          className="bg-white py-8 px-2 relative w-signin-modal-width md:w-[450px] h-[90vh]flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AiOutlineClose
            className="absolute right-4 top-4 hover:cursor-pointer text-xl"
            onClick={props.close}
          />
          <form
            action=""
            className="w-[95%] md:max-w-[80%] mx-auto text-center py-3"
            onSubmit={formSubmitHandler}
          >
            <h1 className="text-3xl font-cos font-medium text-center my-4">
              Sign up with email
            </h1>
            <span className="block text-center mt-4 font-bold">Full Name</span>
            <input
              type="fullname"
              required
              name="fullname"
              ref={fullNameRef}
              minLength={4}
              placeholder="Your full name. (min 4 character)"
              className="block text-sm w-full border-b border-black my-1 placeholder:text-center  focus:border-dark-green focus:outline-none focus:border-b-2 focus:bg-transparent"
            />
            <span className="block text-center mt-4 font-bold">User Name</span>
            <input
              type="username"
              required
              name="username"
              minLength={4}
              ref={userNameRef}
              placeholder="Your name on this website  (min 4 character)"
              className="block text-sm w-full border-b border-black my-1 placeholder:text-center  focus:border-dark-green focus:outline-none focus:border-b-2 focus:bg-transparent"
            />
            <span className="block text-center mt-4 font-bold">Email</span>
            <input
              type="email"
              required
              name="email"
              ref={emailRef}
              placeholder="Your active email address"
              className="block text-sm w-full border-b border-black my-1 placeholder:text-center focus:border-dark-green focus:outline-none focus:border-b-2 focus:bg-transparent"
            />
            <span className="block text-center mt-4 font-bold">Password</span>
            <input
              type="password"
              required
              name="password"
              ref={passwordRef}
              placeholder="Choose a 5 character or longer password "
              minLength={5}
              className="block text-sm  w-full border-b border-black mt-1 placeholder:text-center mb-3 focus:border-dark-green focus:outline-none focus:border-b-2"
            />
            <Button className="inline-block">Sign up</Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
