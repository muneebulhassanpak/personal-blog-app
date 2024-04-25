import React, { useEffect, useState, useRef } from "react";
import { SpacerDiv } from "../wrappers/Spacer";
import Categories from "../components/Home/Categories";
import { BsSearchHeartFill } from "react-icons/bs";
import GeneralCard from "../components/Home/GeneralCard";
import { fetchAll, searchPosts, categoryPosts } from "../URLs/Urls";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import loader from "../assets/loader.json";
import Lottie from "lottie-react";

const Read = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchTermRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams?.get("q");

  const params = useParams();
  const category = params.category;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let response = await fetch(fetchAll, {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        response = await response.json();
        setPosts(response);
        setLoading(false);
        setError(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching all posts:", error);
        setPosts([]);
        setLoading(false);
        setError(true);
      }
    };

    const fetchQueryPosts = async (searchTerm) => {
      try {
        setLoading(true);
        console.log(searchTerm);
        let response = await fetch(searchPosts(searchTerm), {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        response = await response.json();
        setPosts(response.posts);
        setLoading(false);
        setError(false);
        console.log(response.posts);
      } catch (error) {
        console.error("Error fetching query posts:", error);
        setPosts([]);
        setLoading(false);
        setError(true);
      }
    };

    const fetchCategoryPosts = async (category) => {
      if (category == "All") {
        navigate("/read");
      } else {
        try {
          setLoading(true);
          console.log(category);
          let response = await fetch(categoryPosts(category), {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          response = await response.json();
          setPosts(response.posts);
          setLoading(false);
          setError(false);
          console.log(response.posts);
        } catch (error) {
          console.error("Error fetching category posts:", error);
          setPosts([]);
          setLoading(false);
          setError(true);
        }
      }
    };

    if (query) {
      fetchQueryPosts(query);
    } else if (category) {
      fetchCategoryPosts(category);
    } else {
      fetchPosts();
    }
  }, [query, category]);

  const searchQueryHandler = (e) => {
    e.preventDefault();
    const searchTerm = searchTermRef.current.value;
    console.log(searchTerm);
    navigate(`/read?q=${searchTerm}`);
  };

  return (
    <div className="w-full ">
      <SpacerDiv className="max-w-[100%] lg:max-w-[90%]">
        <Categories />
        <form
          action=""
          className="block max-w-xl mx-auto mt-2 w-full relative"
          onSubmit={searchQueryHandler}
        >
          <input
            type="text"
            name="query"
            id="query"
            className="block w-full py-3 px-3 rounded-3xl border border-slate-400 focus:border-slate-800 focus:outline-none"
            placeholder="Search any topic"
            ref={searchTermRef}
          />
          <button type="submit">
            <BsSearchHeartFill className="absolute right-3 top-3 text-2xl hover:cursor-pointer text-pale-yellow" />
          </button>
        </form>
        <div className="flex items-center justify-between flex-wrap flex-col md:flex-row ">
          {loading ? (
            <div className="flex justify-center items-center text-center">
              <Lottie animationData={loader} className="text-center" />
            </div>
          ) : posts.length === 0 ? (
            <div className="w-full text-center mt-4">
              <p>
                {error ? (
                  "Error fetching data"
                ) : (
                  <section className="grid place-items-center h-[calc(70vh-60px)] ">
                    <div className="text-center text-3xl px-2">
                      <span>🙃</span>
                      <p className="text-center text-2xl py-4">
                        Seems like there are no posts in this category.
                      </p>

                      <Link
                        to="/dashboard/write"
                        className="text-center text-black text-base border border-black rounded-xl mt-4  px-4 py-2"
                      >
                        Write Your Own
                        <AiOutlineRight className="inline-block ml-1 text-sm" />
                      </Link>
                    </div>
                  </section>
                )}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <GeneralCard
                className="flex items-center flex-col w-full md:w-[48%] md:flex-row drop-shadow-md border rounded-md mb-2 "
                title={post?.title}
                summary={post?.summary}
                creator={
                  category
                    ? post?.creator?.username
                    : post?.creatorInfo?.username
                }
                content={post?.content}
                createdAt={post?.createdAt}
                category={post?.category}
                key={post._id}
                id={post._id}
              />
            ))
          )}
        </div>
      </SpacerDiv>
    </div>
  );
};

export default Read;
