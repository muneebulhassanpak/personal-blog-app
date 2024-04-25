import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, failureMessage } from "../URLs/Toasts";
import { create } from "../URLs/Urls";
import categories from "../URLs/Categories";
import Select from "react-select";
import {
  fetchSinglePost,
  updateSinglePostWithFile,
  updateSinglePost,
} from "../URLs/Urls";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Write = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  //Query Parameter extraction
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idParam = params.get("id");
  const editingParam = params.get("editing");

  //Const formDataCreation

  useEffect(() => {
    const fetchPostData = async (id) => {
      let response = await fetch(fetchSinglePost(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
      const post = response.post;
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory({ value: post?.category, label: post?.category });
    };
    editingParam == "true" && fetchPostData(idParam);
  }, []);

  //Fetch used for publishing post
  //Form submit handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    //Data preparation
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("category", category.value);
    formData.set("file", file);
    try {
      const response = await fetch(create("N"), {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      data && successMessage("Post created successfully");
      console.log(data);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Fetch used for saving posts in drafts
  const handleDraftPost = async () => {
    if (title.trim().length == 0 || !file) {
      return failureMessage("Draft must have a Title & Image");
    }
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("category", category);
    formData.set("file", file);
    try {
      const response = await fetch(create("Y"), {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      data.success == true && successMessage("Draft Post created successfully");
      data.success == false && failureMessage("Error Creating Draft Post");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Fetch used for saving drafted posts edit work
  const handleEditPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("category", category.value);
    formData.set("file", file);
    try {
      let response;
      if (file != "") {
        console.log("f");
        response = await fetch(updateSinglePostWithFile(idParam), {
          method: "PUT",
          credentials: "include",
          body: formData,
        });
      } else {
        console.log("h");
        const data = {
          title,
          summary,
          content,
          category: category.value,
        };
        response = await fetch(updateSinglePost(idParam), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
      }
      const data = await response.json();
      data.success == true && successMessage("Post Saved successfully");
      data.success == false && failureMessage("Error Saving Draft Post");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="my-6 max-w-4xl mx-auto">
      <div className="text-right pr-4 lg:pr-0">
        {editingParam == "true" ? (
          <button
            className="bg-light-yellow px-3 py-1 rounded-md cursor-pointer"
            onClick={handleEditPost}
          >
            Save Work
          </button>
        ) : (
          <button
            className="bg-light-yellow px-3 py-1 rounded-md cursor-pointer"
            onClick={handleDraftPost}
          >
            Save To Drafts
          </button>
        )}
      </div>
      <form
        action=""
        className="w-full px-2"
        onSubmit={editingParam == "true" ? handleEditPost : formSubmitHandler}
        encType="multipart/form-data"
      >
        <h1 className="text-2xl text-center font-medium mb-3">
          Welcome to your new post
        </h1>
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          className="block w-full p-3 border my-2 rounded-sm"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          name="summary"
          placeholder="Enter enter short description"
          required
          value={summary}
          className="block w-full p-3 border my-2 rounded-sm"
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <div className="flex flex-col md:flex-row sm:justify-between sm:items-center border px-3 py-1 my-2">
          <input
            type="text"
            disabled
            placeholder="Choose a relevent category"
            className="w-full md:flex-1 bg-white mb-1 md:mb-0"
          />
          <Select
            className="w-full md:flex-1  rounded-md sm:p-2 "
            required
            value={category}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={(selectedOption) => setCategory(selectedOption)}
            placeholder="Choose a relevant category"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border p-3 my-2">
          <input
            type="text"
            disabled
            placeholder="Choose a featured image"
            className="w-full md:flex-1 bg-white mb-1 md:mb-0"
          />
          <input
            type="file"
            required
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className="w-full md:flex-1"
          />
        </div>
        <ReactQuill
          modules={modules}
          formats={formats}
          value={content}
          className="z-20"
          onChange={(value) => {
            setContent(value);
          }}
        />
        <input
          type="submit"
          value="Publish Post"
          className="block w-full p-3 text-center bg-pale-yellow cursor-pointer mt-2 rounded-sm"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Write;
