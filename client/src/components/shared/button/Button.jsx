import React from "react";

const Button = (props) => {
  return (
    <button
      className="inline-block py-1 px-5 border-2 border-black bg-black text-white rounded-full"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const SecondaryButton = (props) => {
  return (
    <button
      className="inline-block py-1 px-4 border border-black text-black rounded-full"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
