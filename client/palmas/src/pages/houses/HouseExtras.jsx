import React from "react";
import { Link } from "react-router-dom";

const Options = [
  {
    id: 1,
    name: "Edición de tipos de inmueble",
    icon: (
      <svg
        className=" fill-none h-[150px] lg:h-[200px] w-auto"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M19 16.0001V18.0001M19 21.0001H19.01M12 12.0001V16.0001M14 14.0001H10M5 9.77753V16.2001C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3855 6.63803 20.6731C7.27976 21.0001 8.11984 21.0001 9.8 21.0001H14M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
            className=" stroke-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    ),
    link: "/inmuebles/config/tipos_de_inmueble",
  },
  {
    id: 2,
    name: "Edición de tipos de vehículo",
    icon: (
      <svg
        className=" fill-none h-[150px] lg:h-[200px] w-auto"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15.7993 3C17.2899 3 18.5894 4.01393 18.9518 5.45974L19.337 7H20.25C20.6297 7 20.9435 7.28215 20.9932 7.64823L21 7.75C21 8.1297 20.7178 8.44349 20.3518 8.49315L20.25 8.5H19.714L19.922 9.3265C20.5708 9.72128 21.0041 10.435 21.0041 11.25V19.7468C21.0041 20.7133 20.2206 21.4968 19.2541 21.4968H17.75C16.7835 21.4968 16 20.7133 16 19.7468L15.999 18.5H8.004L8.00408 19.7468C8.00408 20.7133 7.22058 21.4968 6.25408 21.4968H4.75C3.7835 21.4968 3 20.7133 3 19.7468V11.25C3 10.4352 3.43316 9.72148 4.08177 9.32666L4.289 8.5H3.75C3.3703 8.5 3.05651 8.21785 3.00685 7.85177L3 7.75C3 7.3703 3.28215 7.05651 3.64823 7.00685L3.75 7H4.663L5.04898 5.46176C5.41068 4.01497 6.71062 3 8.20194 3H15.7993ZM6.504 18.5H4.499L4.5 19.7468C4.5 19.8848 4.61193 19.9968 4.75 19.9968H6.25408C6.39215 19.9968 6.50408 19.8848 6.50408 19.7468L6.504 18.5ZM19.504 18.5H17.499L17.5 19.7468C17.5 19.8848 17.6119 19.9968 17.75 19.9968H19.2541C19.3922 19.9968 19.5041 19.8848 19.5041 19.7468L19.504 18.5ZM18.7541 10.5H5.25C4.83579 10.5 4.5 10.8358 4.5 11.25V17H19.5041V11.25C19.5041 10.8358 19.1683 10.5 18.7541 10.5ZM10.249 14H13.7507C14.165 14 14.5007 14.3358 14.5007 14.75C14.5007 15.1297 14.2186 15.4435 13.8525 15.4932L13.7507 15.5H10.249C9.83478 15.5 9.49899 15.1642 9.49899 14.75C9.49899 14.3703 9.78115 14.0565 10.1472 14.0068L10.249 14H13.7507H10.249ZM17 12C17.5522 12 17.9999 12.4477 17.9999 13C17.9999 13.5522 17.5522 13.9999 17 13.9999C16.4477 13.9999 16 13.5522 16 13C16 12.4477 16.4477 12 17 12ZM6.99997 12C7.55225 12 7.99995 12.4477 7.99995 13C7.99995 13.5522 7.55225 13.9999 6.99997 13.9999C6.4477 13.9999 6 13.5522 6 13C6 12.4477 6.4477 12 6.99997 12ZM15.7993 4.5H8.20194C7.39892 4.5 6.69895 5.04652 6.50419 5.82556L5.71058 9H18.2929L17.4968 5.82448C17.3017 5.04596 16.6019 4.5 15.7993 4.5Z"
            className=" fill-white"
          ></path>{" "}
        </g>
      </svg>
    ),
    link: "/inmuebles/config/tipos_de_vehiculo",
  },
];

function HouseExtras() {
  return (
    <div className=" flex-wrap min-h-screen w-screen bg-gradient-to-br from-[#852655] to-[#8f0e2a]">
      <div className=" pb-[90px] md:py-0 md:pl-[70px] grid grid-cols-1 md:grid-cols-2">
        {Options.map((option) => (
          <Link key={option.id} to={option.link}>
            <div className="  flex justify-center items-center h-[450px] md:h-screen w-full border-[1px] hover:bg-[#339494] transition duration-300 cursor-pointer border-white">
              <div className="block">
                <div className=" flex justify-center items-center">
                  {option.icon}
                </div>
                <div className=" my-5 flex justify-center items-center">
                  <h1 className=" text-lg px-2 text-center md:text-xl text-white font-bold">
                    {option.name}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HouseExtras;
