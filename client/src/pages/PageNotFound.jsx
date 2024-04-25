import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const PageNotFound = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-md text-center">
        <h1 className="text-center text-4xl mb-3">404</h1>
        <h3 className="text-center text-xl">Sorry! This page doesn't exits</h3>
        <Link
          to="/"
          className="text-blue-500 text-base text-center inline-block "
        >
          <BiArrowBack className="inline-block mr-1" />
          <p className="mt-2 inline-block">Back to home</p>
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
