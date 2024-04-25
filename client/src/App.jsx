import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

//Custom imports
import HomeWrapper from "./wrappers/HomeWrapper";
import Write from "./pages/Write";
import Read from "./pages/Read";
import Stats from "./pages/Stats";
import DashboardWrapper from "./wrappers/DashboardWrapper";
import Saved from "./pages/Saved";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./pages/Protected";
import { fetchUserData } from "./URLs/Urls";
import {
  Login as LoginAction,
  Logout as LogoutAction,
} from "./store/userSlice";

const App = () => {
  const cookie = Cookies.get("access_token");
  const dispatch = useDispatch();
  useEffect(() => {
    const pullUserData = () => {
      fetch(fetchUserData, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((user) => {
          user.success == true && dispatch(LoginAction(user.user));
          user.success == false && dispatch(LogoutAction());
        });
    };
    cookie && pullUserData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeWrapper />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<SinglePost />} />
        <Route path="read/category/:category" element={<Read />} />
        <Route path="read" element={<Read />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <Protected>
            <DashboardWrapper />
          </Protected>
        }
      >
        <Route index element={<Stats />} />
        <Route path="write" element={<Write />} />
        <Route path="saved" element={<Saved />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
