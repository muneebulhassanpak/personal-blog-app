import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
// import postsReducer from "./postsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
