import React from "react";

export const SpacerDiv = (props) => {
  return (
    <div className={`max-w-6xl mx-auto xl:px-0 px-3 ${props.className}`}>
      {props.children}
    </div>
  );
};

const SpacerFlex = (props) => {
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto py-4 xl:px-0 px-3">
      {props.children}
    </div>
  );
};

export default SpacerFlex;
