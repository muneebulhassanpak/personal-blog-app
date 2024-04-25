import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../URLs/Urls";
import { UpdateUser } from "../store/userSlice";
import { failureMessage, successMessage } from "../URLs/Toasts";
import { ToastContainer, toast } from "react-toastify";
import { updateUserPicture } from "../URLs/Urls";
import { imageUrlReturner } from "../components/shared/sharedCode/FetchProfilePicture";

const UpdateProfile = (props) => {
  const [file, setFile] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("file", file);
    try {
      const response = await fetch(updateUserPicture, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      data.success == true &&
        successMessage("Profile Picture uploaded successfully");
      data.success == false &&
        failureMessage("Error Uploading profile picture");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 z-50 h-full bg-gray-900/75 grid place-items-center">
      <div className="relative w-[290px] min-h-[200px]  sm:w-[400px] md:w-[500px] px-2 py-10 md:px-4 bg-white rounded-md">
        <button className=" absolute right-4 top-4">
          <AiOutlineClose className="text-xl" onClick={props.closeModal} />
        </button>
        {props.type == "picture" ? (
          <>
            <form
              action=""
              className="w-full flex flex-col items-center"
              encType="multipart/form-data"
              onSubmit={handleFormSubmit}
            >
              {imageUrlReturner() != "" ? (
                <img
                  src={`http://localhost:3002/${imageUrlReturner()}`}
                  className="w-12 h-12 rounded-full object-cover inline-block"
                />
              ) : (
                <BsPersonCircle className="text-4xl" />
              )}
              <input
                type="file"
                name="file"
                id="file"
                required
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className="max-w-[200px] sm:max-w-[200px]  text-xs sm:text-base mt-4"
              />
              <button className="px-4 py-1 rounded-md bg-black text-white mt-4">
                Update
              </button>
            </form>
          </>
        ) : (
          <UpdateProfileContent closeModal={props.closeModal} />
        )}
      </div>
    </div>
  );
};

const UpdateProfileContent = (props) => {
  const user = useSelector((store) => store.user.user);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setUserName(user?.username);
    setEmail(user?.email);
    setPassword(user?.password);
  }, []);

  //Form data validator
  const formDataValidator = (username, email, password) => {
    if (
      username.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0
    ) {
      return false;
    }
    return true;
  };
  //Form submission handling
  const dispatch = useDispatch();
  const handlFormSubmission = (e) => {
    e.preventDefault();
    if (!formDataValidator(username, email, password)) {
      return;
    }
    const data = {
      username,
      email,
      password,
    };

    //Fetch used
    fetch(updateUserData, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        user.success == true &&
          dispatch(UpdateUser(user.user)) &&
          successMessage("Successfully updated") &&
          setTimeout(() => {
            props.closeModal();
          }, 2000);
        user.success == false && failureMessage("Incorrect credentials");
      });
  };

  return (
    <>
      <form
        action=""
        onSubmit={handlFormSubmission}
        className="w-full px-4 flex flex-col items-center"
      >
        <h1 className="text-center text-2xl font-medium">
          Update how we know you
        </h1>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className=" text-xs sm:text-base mt-4 border rounded-md w-full p-2"
          placeholder="Person's username comes here"
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className=" text-xs sm:text-base mt-4 border rounded-md w-full p-2"
          placeholder="Person's email comes here"
        />
        <input
          type="text"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className=" text-xs sm:text-base mt-4 border rounded-md w-full p-2"
          placeholder="Person's password comes here"
        />
        <button className="px-4 py-1 rounded-md bg-black text-white mt-4">
          Update
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
