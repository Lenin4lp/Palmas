import React from "react";
import { Link } from "react-router-dom";

const HouseBar = () => {
  return (
    <div className="  flex justify-around  w-screen h-[50px] md:h-[80px] bg-gradient-to-r from-[#852655] to-[#8f0e2a]">
      <div className=" flex justify-center items-center">
        <div className=" md:pl-[70px] w-screen h-full grid grid-cols-3">
          <Link
            to={`/inmuebles`}
            className=" hover:cursor-pointer bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-300 border-[1px] flex justify-center items-center border-[#943338]"
          >
            <h1 className=" text-white text-sm md:text-base">General</h1>
          </Link>
          <Link
            to={`/inmuebles/registrar`}
            className=" hover:cursor-pointer bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-300 border-[1px] flex justify-center items-center border-[#943338]"
          >
            <h1 className=" text-white text-sm md:text-base">Registro</h1>
          </Link>
          <Link
            to={`/inmuebles/config`}
            className=" hover:cursor-pointer bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-300 border-[1px] flex justify-center items-center border-[#943338]"
          >
            <h1 className=" text-white text-sm md:text-base">Config</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HouseBar;
