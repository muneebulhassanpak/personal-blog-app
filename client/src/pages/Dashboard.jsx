import React from "react";
import { BsSearchHeartFill } from "react-icons/bs";
import ReadDrawer from "../components/ReadDrawer/ReadDrawer";
import Categories from "../components/Home/Categories";
import { SpacerDiv } from "../wrappers/Spacer";
import muneeb from "../assets/muneeb.jpg";
import GeneralCard from "../components/Home/GeneralCard";

const names = [
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
  muneeb,
];

const Read = () => {
  return (
    <main className="flex">
      <ReadDrawer className="w-2/12 lg:w-1/12" />
      <div className="w-10/12 lg:w-9/12">
        <SpacerDiv className="max-w-[100%] lg:max-w-[90%]">
          <Categories />
          <form
            action=""
            className="block max-w-xl mx-auto my-2 w-full relative"
          >
            <input
              type="text"
              name="query"
              id="query"
              className="block w-full py-3 px-3 rounded-3xl border border-slate-400 focus:border-slate-800 focus:outline-none"
              placeholder="Search any topic"
            />
            <BsSearchHeartFill className="absolute right-3 top-3 text-2xl hover:cursor-pointer" />
          </form>
          <div className="flex items-center flex-wrap">
            <GeneralCard className="flex items-center flex-col sm:w-1/2 md:flex-row drop-shadow-md border p-1 rounded-md md:my-1 my-0" />
            <GeneralCard className="flex items-center flex-col sm:w-1/2 md:flex-row drop-shadow-md border p-1 rounded-md md:my-1 my-0" />
          </div>
        </SpacerDiv>
      </div>
      <div className="hidden md:w-2/12  lg:flex lg:flex-col md:justify-center">
        <h3 className="text-center mb-4 font-normal text-base">
          Your Subscriptions
        </h3>
        <div className="flex items-center flex-wrap ">
          {names.map((name) => (
            <div className="w-1/2 text-center mb-4">
              <img
                src={name}
                alt=""
                className="h-10 w-10  rounded-full inline-block "
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Read;
