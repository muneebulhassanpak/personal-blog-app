import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../URLs/Urls";
import {
  BsBookmarks,
  BsFillBookmarkCheckFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Fetched } from "../store/postSlice";
import { failureMessage } from "../URLs/Toasts";
import { ToastContainer } from "react-toastify";
import { savePost } from "../store/userSlice";
import { PostSave } from "../components/shared/sharedCode/SaveAPost";
import { UpdateUser } from "../store/userSlice";
import { imageUrlReturner } from "../components/shared/sharedCode/FetchProfilePicture";
import loader from "../assets/loader.json";
import Lottie from "lottie-react";

const SinglePost = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState("");
  const [success, setSuccess] = useState(false);
  const params = useParams();
  const postId = params.id;
  // Redux toolkit stuff
  const dispatch = useDispatch();
  const UsersSavedPosts = useSelector(
    (store) => store?.user?.user?.savedArticles
  );
  const userLoggedIn = useSelector((store) => store?.user?.isLoggedIn);
  //Save post handler
  const savePostHandler = () => {
    if (!userLoggedIn) {
      return;
    }
    dispatch(savePost(post._id));
    const handlePostSave = async () => {
      const data = await PostSave(post._id);
      data.success === true && dispatch(UpdateUser(data.user));
    };
    handlePostSave();
  };
  //Fetching the post
  const fetchOnePost = async () => {
    // dispatch(Fetching());
    let response = await fetch(fetchSinglePost(postId), {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    response = await response.json();
    setSuccess(Boolean(response?.success));
    response.success === true &&
      setPost(response.post) &&
      dispatch(Fetched(response?.post));
    response.success === false && failureMessage("Error fetching post");
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchOnePost();
    })();
  }, [success]);

  const featureImage = useMemo(
    () => post?.featuredImage?.split("\\")[1],
    [post]
  );
  return (
    <>
      <section className="max-w-4xl mx-auto mt-4 mb-6">
        <h1 className="text-4xl md:text-5xl text-center font-sans font-bold mt-3 mb-4 md:my-5 leading-9 md:leading-[48px]">
          {post?.title}
        </h1>
        <div className=" w-full rounded-lg overflow-hidden">
          <img
            src={`http://localhost:3002/${featureImage}`}
            alt="featured-image-of-post"
            className="w-full h-auto md:h-full  md:object-contain"
          />
        </div>
        <div className="mt-3 flex items-center max-w-3xl mx-auto">
          <div className="flex-1 flex items-center px-2">
            {imageUrlReturner() != "" ? (
              <img
                src={`http://localhost:3002/${imageUrlReturner()}`}
                className="w-10 h-10 rounded-full object-cover inline-block"
              />
            ) : (
              <BsPersonCircle className="inline-block text-2xl" />
            )}
            <h4 className="ml-2">{post?.username || "Muneeb"}</h4>
          </div>
          <div className="flex items-center">
            <span className="px-4 py-2 bg-slate-400 text-white rounded-full text-sm mr-3">
              {post?.category}
            </span>
            <button onClick={savePostHandler}>
              {UsersSavedPosts?.includes(post?._id) ? (
                <BsFillBookmarkCheckFill className="text-xl mr-2 cursor-pointer" />
              ) : (
                <BsBookmarks className="text-xl mr-2 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
        <div
          className="py-6 px-2"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </section>
      {loading && (
        <section className="grid place-items-center bg-red-400 h-[50vh]">
          <Lottie animationData={loader} className="w-28 h-28" />
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default SinglePost;
