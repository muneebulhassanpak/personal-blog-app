import React, { useState } from "react";
import karma from "../../assets/karma.png";
import { BsBookmarks, BsFillBookmarkCheckFill } from "react-icons/bs";
import { PostSave } from "../shared/sharedCode/SaveAPost";
import { readingTime } from "reading-time-estimator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../store/userSlice";

const GeneralCard = (props) => {
  const timeToRead = readingTime(props?.content, 10);
  let postDescription = props?.summary;
  if (postDescription) {
    postDescription = postDescription.slice(0, 80);
  }
  //Save icon logic
  const UsersSavedPosts = useSelector(
    (store) => store?.user?.user?.savedArticles
  );

  //Post Saving Logic
  // const dispatch = useDispatch();
  // const [isSaved, setIsSaved] = useState(false);
  // const handlePostSave = async (e) => {
  //   e.preventDefault();
  //   const data = await PostSave(props.id);
  //   console.log(data);
  //   if (data.success === true) {
  //     setIsSaved(true);
  //     dispatch(UpdateUser(data.user));
  //   }
  // };

  //Date transformation logic
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Short month name like "Jul"
    return `${day} ${month}`;
  };

  return (
    <Link
      to={`/post/${props.id}`}
      className={`${props.className} overflow-hidden`}
    >
      <div className="w-full md:w-2/3 order-2 md:order-1 py-1 px-2">
        <div className="top my-1">
          <img
            src=""
            alt="person"
            className="w-5 h-5 rounded-full inline-block"
          />
          <h5 className="text-sm font-bold font-cos inline-block ml-1">
            {props.creator}
          </h5>
        </div>
        <h1 className="text-xl font-bold">{props.title}</h1>
        <p className="text-sm text-gray-700">{`${postDescription}...`}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs my-2">
            <span>{formatDate(props.createdAt)} :</span>
            <span className="ml-1">{`${
              timeToRead?.minutes || 12
            } minutes`}</span>
            <span className="inline-block bg-gray-300 px-2 py-1 ml-1 rounded-full ">
              {props.category}
            </span>
          </div>
          <div>
            <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handlePostSave();
            // }}
            >
              {UsersSavedPosts?.includes(props?.id) ? (
                <BsFillBookmarkCheckFill className="text-xl mr-2 cursor-pointer" />
              ) : (
                <BsBookmarks className="text-xl mr-2 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex-shrink-0 order-1 md:order-2">
        <img src={karma} alt="" className="w-full h-full object-contain" />
      </div>
      {/* </div> */}
    </Link>
  );
};

export default GeneralCard;
