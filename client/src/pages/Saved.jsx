import React, { useState, useEffect } from "react";
import GeneralCard from "../components/Home/GeneralCard";
import { savedPosts } from "../URLs/Urls";
import { SpacerDiv } from "../wrappers/Spacer";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import loader from "../assets/loader.json";
import Lottie from "lottie-react";

const Saved = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(savedPosts, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="pt-6 pb-4">
      <SpacerDiv>
        {loading ? (
          <Lottie animationData={loader} />
        ) : (
          <>
            {posts.length > 0 && (
              <h1 className="text-center text-3xl mb-3">
                Welcome to your saved posts
              </h1>
            )}
            <div className="flex flex-col md:flex-row items-center">
              {posts.length > 0 && !error ? (
                posts.map((post) => (
                  <GeneralCard
                    className="flex border flex-col md:flex-row md:w-[48%] rounded-md my-2 mx-1 shadow-lg"
                    creator={post?.creator?.username}
                    title={post?.title}
                    summary={post?.summary}
                    createdAt={post?.createdAt}
                    content={post?.content}
                    key={post?._id}
                    id={post?._id}
                    category={post?.category}
                  />
                ))
              ) : (
                <>
                  {error ? (
                    <p>Something went wrong fetching saved posts</p>
                  ) : (
                    <section className="grid place-items-center h-[calc(70vh-60px)] ">
                      <div className="text-center text-3xl px-2">
                        <span>🙃</span>
                        <p className="text-center text-2xl py-4">
                          Seems like you haven't saved any posts.
                        </p>

                        <Link
                          to="/read"
                          className="text-center text-black text-base border border-black rounded-xl mt-4  px-4 py-2"
                        >
                          Save Now
                          <AiOutlineRight className="inline-block ml-1 text-sm" />
                        </Link>
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </SpacerDiv>
    </section>
  );
};

export default Saved;
