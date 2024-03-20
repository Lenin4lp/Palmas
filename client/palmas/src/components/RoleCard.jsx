import React, { useState } from "react";

const RoleCard = ({ roleTitle, roleColor, extra }) => {
  return (
    <div className=" my-5 hover:cursor-pointer hover:scale-[1.02] h-fit w-fit relative transition duration-500">
      <svg
        className={`  h-[200px] w-auto ${roleColor} duration-500 transition`}
        viewBox="0 0 512 512"
        id="icons"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M408,16H104A24,24,0,0,0,80,40V472a24,24,0,0,0,24,24H408a24,24,0,0,0,24-24V40A24,24,0,0,0,408,16ZM346.9,312.77a43,43,0,1,1-40.71-40.71A43,43,0,0,1,346.9,312.77ZM192,64H320V96H192ZM384,448H224V423.4c0-32.72,53.27-49.21,80-49.21s80,16.49,80,49.21Z"></path>
        </g>
      </svg>
      <div className=" absolute top-[45px] left-[40px] text-8xl font-extrabold text-white">
        {roleTitle}
      </div>
    </div>
  );
};

export default RoleCard;
