import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#8f0e2a]">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#852655] to-white animate-spin">
        <div class="h-9 w-9 rounded-full bg-[#8f0e2a]"></div>
      </div>
    </div>
  );
}

export default Loader;
