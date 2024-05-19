import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed z-40 h-screen inset-0 justify-center items-center transition-colors ${
          open ? "visible bg-black/50" : "invisible"
        }`}
      >
        <div className=" flex h-full justify-center items-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-b from-[#852655] to-[#8f0e2a] rounded-xl shadow p-6 transition-all ${
              open ? "scale-100 opacity-100" : "scale-125 opacity-0"
            } `}
          >
            <button
              onClick={onClose}
              className=" absolute top-2 right-2 p-1 rounded w-fit h-fit"
            >
              <svg
                className=" h-[30px]"
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
                  <g id="Edit / Close_Circle">
                    {" "}
                    <path
                      id="Vector"
                      d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      className=" stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
