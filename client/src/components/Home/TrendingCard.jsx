import React, { useState, useEffect } from "react";
import { SpacerDiv } from "../../wrappers/Spacer";
import muneeb from "../../assets/muneeb.jpg";
import { FiTrendingUp } from "react-icons/fi";
import { fetchTrending } from "../../URLs/Urls";
import { readingTime } from "reading-time-estimator";
import { Link } from "react-router-dom";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Short month name like "Jul"
  return `${day} ${month}`;
};

const TrendingCards = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  //Read Time calculation
  const calculatedTime = (content) => {
    const timeToRead = readingTime(content, 10);
    return timeToRead?.minutes;
  };

  //Fetch used
  useEffect(() => {
    const fetchPosts = async () => {
      let response = await fetch(fetchTrending, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      response = await response.json();
      response.success === true && setTrendingPosts(response.posts);
      console.log(response);
    };
    fetchPosts();
  }, []);

  return (
    <SpacerDiv className="py-4 border-b border-slate-100">
      <div className="font-medium text-xl">
        <FiTrendingUp className="inline-block mr-2" />
        <h3 className="my-2 inline-block">Trending on AsoBooks</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap ">
        {trendingPosts.length > 0 &&
          trendingPosts.map((post, index) => (
            <Link
              to={`/post/${post?._id}`}
              className="flex w-full sm:w-[49%] lg:w-1/3 py-4 px-2 rounded-md  max-w-auto lg:max-w-xs bg-light-yellow mb-2 sm:odd:mr-1 md:odd:mr-0"
              key={post?._id}
            >
              <div className="w-1/4">
                <h4 className="mb-2 text-center text-2xl font-medium text-gray-400">
                  {index + 1}
                </h4>
              </div>

              <div className="w-3/4">
                <img
                  src={muneeb}
                  alt="Writer"
                  className="bg-cover w-10 h-10 rounded-full border inline-block "
                />

                <h4 className="ml-2 inline-block text-sm">
                  {post?.creator?.username}
                </h4>
                <p className="mt-1 font-semibold">{post.title}</p>
                <div className="text-sm">
                  <span>{`${formatDate(post?.createdAt)} :`}</span>
                  <span className="ml-2">{`${calculatedTime(
                    post?.content
                  )} minutes`}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </SpacerDiv>
  );
};

export default TrendingCards;
