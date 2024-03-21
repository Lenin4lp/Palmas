import React from "react";

const PlaceButton = ({ children, color, svg }) => {
  return (
    <div
      className={`  p-10 rounded-full flex justify-center items-center transition duration-300  ${color} mx-5 h-[100px] lg:h-[150px] w-[100px] lg:w-[150px]`}
    >
      <div className=" block">
        <div className=" flex justify-center items-center transition duration-500">
          {svg}
        </div>
        <div className=" flex justify-center items-end">{children}</div>
      </div>
    </div>
  );
};

export default PlaceButton;
