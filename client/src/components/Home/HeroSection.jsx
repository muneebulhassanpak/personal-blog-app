import React from "react";
import { SpacerDiv } from "../../wrappers/Spacer";
import Button from "../shared/button/button";
import Lottie from "lottie-react";
import Person from "../../assets/animation_lkdw2i9a.json";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="min-h-main-section-width bg-pale-yellow flex border-b border-black">
      <SpacerDiv className="flex-1 left flex justify-center items-center">
        <div className="text-center md:text-left ">
          <h1 className="md:text-6xl  leading-9 Sm:leading-[55px] text-4xl sm:text-5xl ">
            Feed Your
            <span className="font-cos ml-2">Curosity</span>
          </h1>
          <h3 className="leading-5 mb-4 mt-2 md:my-3 text-xl max-w-auto md:max-w-sm">
            Discover stories, thinking, and expertise from writers on any topic.
          </h3>
          <Button>
            <Link to="/read">Start Reading</Link>
          </Button>
        </div>
        <div className="right flex-1 hidden md:block">
          {/* <Lottie animationData={Person} /> */}
        </div>
      </SpacerDiv>
    </main>
  );
};

export default HeroSection;
