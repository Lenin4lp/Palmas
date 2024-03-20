import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const SideBar = ({ children }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex overflow-hidden relative">
      <div className=" block md:flex">
        <div
          className={` bg-gradient-to-b from-[#852655] to-[#8f0e2a] w-screen md:w-[70px]  pt-5  sm:pt-8 duration-300 h-[90px] md:h-screen flex justify-center items-center fixed bottom-0 md:top-0 z-10`}
        >
          <div className=" absolute top-[5px] md:top-[20px] flex justify-centers items-center">
            <img
              className={` h-[25px] md:h-[40px] w-[25px] md:w-[40px] duration-500 hover:rotate-[360deg] hover:cursor-pointer`}
              src="https://softdeveral.com/AliQuo/minilogo.png"
              alt="logo"
            />
          </div>
          <div className=" absolute bottom-[30px] hidden md:flex justify-centers items-center">
            <svg
              onClick={logout}
              className=" hover:cursor-pointer h-[30px] w-[30px]"
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              stroke="#ffffff"
              strokeWidth="1"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M366.473,172.549c-8.552-9.598-23.262-10.44-32.858-1.888c-9.595,8.552-10.44,23.263-1.887,32.858 c16.556,18.576,25.676,42.527,25.676,67.443c-0.002,55.913-45.49,101.402-101.404,101.402s-101.402-45.489-101.402-101.402 c0-24.913,9.118-48.863,25.678-67.443c8.552-9.595,7.705-24.308-1.89-32.86c-9.596-8.552-24.306-7.705-32.858,1.89 c-24.166,27.116-37.474,62.065-37.474,98.413C108.052,352.54,174.421,418.909,256,418.909s147.948-66.369,147.948-147.948 C403.948,234.611,390.639,199.661,366.473,172.549z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M256,93.091c-12.853,0-23.273,10.42-23.273,23.273v99.739c0,12.853,10.42,23.273,23.273,23.273 c12.853,0,23.273-10.42,23.273-23.273v-99.739C279.273,103.511,268.853,93.091,256,93.091z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M256,0C114.842,0,0,114.842,0,256s114.842,256,256,256c141.16,0,256-114.842,256-256S397.16,0,256,0z M256,465.455 c-115.493,0-209.455-93.961-209.455-209.455S140.507,46.545,256,46.545S465.455,140.507,465.455,256S371.493,465.455,256,465.455z "></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className=" flex justify-center md:grid grid-rows-1 gap-4 sm:gap-8 md:gap-4 lg:gap-8">
            <div className=" group relative">
              <span className=" absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                Billetera
              </span>
              <Link to="/billetera">
                <svg
                  className=" hover:cursor-pointer h-[30px] lg:h-[30px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M19 7.24997H18.75V4.99997C18.7474 4.53665 18.5622 4.09305 18.2345 3.76543C17.9069 3.43781 17.4633 3.25259 17 3.24997C16.9207 3.23552 16.8393 3.23552 16.76 3.24997L4.86 7.24997H4.75H4.59L4.42 7.30997H4.28L4.12 7.39997L4 7.56997L3.86 7.68997L3.75 7.78997L3.63 7.93997C3.598 7.96867 3.57097 8.00246 3.55 8.03997C3.51288 8.09779 3.47948 8.15791 3.45 8.21997L3.39 8.32997C3.36216 8.40179 3.33878 8.47526 3.32 8.54997C3.3245 8.5865 3.3245 8.62344 3.32 8.65997C3.30967 8.77307 3.30967 8.88687 3.32 8.99997V19C3.3221 19.4515 3.49765 19.8849 3.81034 20.2106C4.12303 20.5364 4.54895 20.7295 5 20.75H19C19.4633 20.7473 19.9069 20.5621 20.2345 20.2345C20.5622 19.9069 20.7474 19.4633 20.75 19V8.99997C20.7474 8.53665 20.5622 8.09305 20.2345 7.76543C19.9069 7.43781 19.4633 7.25259 19 7.24997ZM17.08 4.75997C17.1293 4.77814 17.1719 4.81078 17.2022 4.85362C17.2325 4.89646 17.2492 4.94748 17.25 4.99997V7.24997H9.62L17.08 4.75997ZM19.25 19C19.25 19.0663 19.2237 19.1299 19.1768 19.1767C19.1299 19.2236 19.0663 19.25 19 19.25H5C4.9337 19.25 4.87011 19.2236 4.82322 19.1767C4.77634 19.1299 4.75 19.0663 4.75 19V8.99997C4.75 8.93367 4.77634 8.87008 4.82322 8.82319C4.87011 8.77631 4.9337 8.74997 5 8.74997H19C19.0663 8.74997 19.1299 8.77631 19.1768 8.82319C19.2237 8.87008 19.25 8.93367 19.25 8.99997V19Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      d="M16.5 15.25C17.1904 15.25 17.75 14.6904 17.75 14C17.75 13.3096 17.1904 12.75 16.5 12.75C15.8096 12.75 15.25 13.3096 15.25 14C15.25 14.6904 15.8096 15.25 16.5 15.25Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
            </div>
            <div className=" group relative">
              <span className=" absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                Calendario
              </span>
              <Link to="/calendario">
                <svg
                  className=" hover:cursor-pointer h-[30px] lg:h-[30px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                      stroke="#ffffff"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
            </div>
            <div className=" group relative">
              <span className=" absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                Inmuebles
              </span>
              <Link to={"/casas"}>
                <svg
                  className=" hover:cursor-pointer h-[30px] lg:h-[30px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
                      stroke="#ffffff"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
            </div>
            <div className=" group relative">
              <span className=" absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                Vecinos
              </span>
              <Link to={"/vecinos"}>
                <svg
                  className=" hover:cursor-pointer h-[30px] lg:h-[30px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H8.4M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z"
                      stroke="#ffffff"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
            </div>
            <div className=" group relative">
              <span className=" absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                Alicuotas
              </span>
              <Link to={"/alicuotas"}>
                <svg
                  className=" hover:cursor-pointer h-[30px] lg:h-[30px] w-auto"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25ZM11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748ZM12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SideBar;
