import React, { useState, useEffect } from "react";
import { SpacerDiv } from "../../wrappers/Spacer";
import { Link } from "react-router-dom";
import GeneralCard from "./GeneralCard";
import { fetchAll } from "../../URLs/Urls";
import importedCategories from "../../URLs/Categories";

const GeneralPostSection = () => {
  const [posts, setPosts] = useState([]);

  //Fetch used
  useEffect(() => {
    const fetchPosts = async () => {
      let response = await fetch(fetchAll, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      response = await response.json();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  const categories = importedCategories.slice(0, 10);

  return (
    <SpacerDiv className="flex flex-col md:flex-row  py-4 ">
      {posts.length == 0 && <p>Error fetching posts or no posts exist</p>}
      <div className="flex-1 md:w-3/5  flex items-center flex-col  order-2 md:order-1">
        {posts.length > 0 &&
          posts.map((post) => (
            <GeneralCard
              className="w-full flex flex-col border md:flex-row mb-3 rounded-md shadow-lg"
              title={post?.title}
              summary={post?.summary}
              creator={post?.creatorInfo?.username}
              creatorId={post?.creatorInfo?._id}
              createdAt={post?.createdAt}
              category={post?.category}
              content={post?.content}
              id={post._id}
              key={post._id}
            />
          ))}
      </div>

      {/* <GeneralCard className="w-full md:w-3/5  flex items-center flex-col md:flex-row  order-2 md:order-1" /> */}

      <div className="flex-1 w-full md:w-2/5 order-1 md:order-2 md:sticky md:top-[80px] bg-white">
        <div className=" flex flex-col md:max-w-[90%] md:ml-auto md:items-center items-center">
          <h3 className="text-base font-semibold mb-1">
            Discover more of what matters to you
          </h3>
          <div className="right flex justify-evenly md:justify-end flex-wrap mt-2">
            {categories.map((category, index) => (
              <Link
                to={`/read/category/${category}`}
                key={index}
                className="flex-shrink-0 inline-block bg-gray-300  px-4 py-2 rounded-full mx-1 mb-2 text-sm"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SpacerDiv>
  );
};

export default GeneralPostSection;
