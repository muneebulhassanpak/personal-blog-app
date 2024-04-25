import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

const StatCard = (props) => {
  return (
    <div className="w-full bg-white relative flex gap-2 justify-center items-center min-w-[150px] sm:w-[32%] rounded-md  p-3 sm:p-6 text-right">
      <div className="bg-black p-2 rounded-lg overflow-hidden mt-4 lg:mt-0">
        {props.text == "Posts" ? (
          <BsReverseLayoutTextSidebarReverse className="text-3xl text-white " />
        ) : props.text == "Reads" ? (
          <BsGraphUpArrow className="text-3xl text-white " />
        ) : (
          <SlUserFollow className="text-3xl text-white " />
        )}
      </div>
      <div className="mt-4 lg:mt-0">
        <h2 className="text-3xl text-center">{props.number}</h2>
        <h3 className="absolute top-2 right-2 px-3 py-1 rounded-full text-sm bg-pale-yellow">
          {props.text}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
