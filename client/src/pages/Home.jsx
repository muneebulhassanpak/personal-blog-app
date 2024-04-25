import React from "react";
import HeroSection from "../components/Home/HeroSection";
import TrendingCards from "../components/Home/TrendingCard";
import GeneralPostSection from "../components/Home/GeneralPostSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <TrendingCards />
      <GeneralPostSection />
    </>
  );
};

export default Home;
