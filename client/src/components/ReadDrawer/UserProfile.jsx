import React from "react";
import muneeb from "../../assets/muneeb.jpg";
import { AiOutlineSetting } from "react-icons/ai";

const UserProfile = () => {
  return (
    <button className="flex items-center group ">
      <span className="text-base text-gray-600 mx-2 inline-block">
        Profile Settings
      </span>
      <AiOutlineSetting className="inline-block group-hover:rotate-[720deg] transition-transform duration-200 " />
    </button>
  );
};

export default UserProfile;
