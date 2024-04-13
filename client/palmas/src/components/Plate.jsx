import React from "react";

const Plate = ({ vehicleType, plate, onClick }) => {
  return (
    <div className=" h-[100px] w-[230px] bg-white rounded-lg p-1 relative">
      <div className=" absolute top-[7px] right-[7px]">
        <svg
          onClick={onClick}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className=" h-[19px] hover:cursor-pointer fill-none"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Edit / Remove_Minus_Circle">
              {" "}
              <path
                id="Vector"
                d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                className="stroke-[#971e28]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <div className=" block w-full h-full border-[1px] border-[#8f0e2a] rounded-lg ">
        <div className=" flex justify-center items-center w-full">
          <h1>{vehicleType}</h1>
        </div>
        <div className=" w-full py-[10px] flex justify-center items-center">
          <h1 className=" text-4xl">{plate}</h1>
        </div>
      </div>
    </div>
  );
};

export default Plate;
