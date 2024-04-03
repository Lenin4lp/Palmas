import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

function Aliquot() {
  const aliquotData = useLoaderData();
  const aliquots = aliquotData.data;
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  console.log(aliquots);

  if (navigation.state === "loading") {
    return <div>Cargando</div>;
  }
  return (
    <div className=" w-screen h-fit min-h-screen md:pl-[70px]">
      <div className=" block">
        <div className=" px-5 w-full h-[100px] bg-gradient-to-r flex justify-start items-center from-[#852655] to-[#8f0e2a]">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white h-[35px] md:h-[60px] px-5 w-auto"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z"></path>{" "}
              <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z"></path>{" "}
              <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z"></path>{" "}
              <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"></path>{" "}
            </g>
          </svg>
          <h1 className=" text-3xl text-white font-semibold">Alicuotas</h1>
        </div>
        <div className="m-5 flex justify-start  items-center">
          <button className=" bg-[#852655] hover:bg-[#8f0e2a] shadow-lg shadow-[#9b9b9b] transition duration-300 active:shadow-transparent active:border-[1px] active:border-black p-3 rounded-lg">
            <h1 className=" text-white ">Crear alicuota</h1>
          </button>
        </div>
        <div className=" flex justify-center items-center h-fit w-full">
          <div className=" flex-wrap my-5 flex justify-center">
            {aliquots.length > 0 &&
              aliquots.map((aliquot) => (
                <div className=" h-[120px] w-[220px] rounded-lg relative bg-[#8f0e2a] hover:bg-[#852655] flex justify-center items-center transition duration-300  ">
                  <div className=" m-1 absolute top-0 right-0">
                    <svg
                      className=" h-[19px] cursor-pointer"
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
                          d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                          className=" fill-white"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="block">
                    <div className=" m-1 flex justify-center items-center">
                      <h1 className=" text-white text-lg font-semibold">{`Alicuota N° ${aliquot.monthlyFee_id}`}</h1>
                    </div>
                    <div className=" m-1 flex justify-center items-center">
                      <h1 className=" text-white text-base font-medium">{`c/mensual`}</h1>
                    </div>
                    <div className=" m-1 flex justify-center items-center">
                      <p className=" text-white text-xl">{`$${aliquot.monthlyFee_value}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            {aliquots.length === 0 && (
              <div className="flex justify-center items-center">
                <h1>No hay alicuotas registradas</h1>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center bg-gradient-to-r from-white to-[#cccccc] mt-5 w-full h-[100px] border-[1px] border-[#8f0e2a] ">
          <h1 className=" text-2xl text-[#8f0e2a] font-bold">
            Registro de pago
          </h1>
        </div>
        <div className=" flex justify-center items-center bg-gradient-to-bl from-[#852655] to-[#8f0e2a] w-full h-fit">
          <div className=" w-full flex justify-start items-center">
            <div className=" p-5">
              <div className="relative group">
                <button
                  onClick={toggleDropDown}
                  id="dropdown-button"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#8f0e2a]"
                >
                  <span className="mr-2">Open Dropdown</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 ml-2 -mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown-menu"
                  className={` ${
                    isOpen == true ? "" : "hidden"
                  } absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
                >
                  <input
                    id="search-input"
                    className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                    type="text"
                    placeholder="Search items"
                    autocomplete="off"
                  />

                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Uppercase
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Lowercase
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Camel Case
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Kebab Case
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aliquot;
