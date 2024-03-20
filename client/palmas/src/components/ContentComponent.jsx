import React from "react";

const ContentComponent = ({ children }) => {
  return (
    <div className=" pb-[90px] md:py-0 md:px-[70px] w-screen">
      <div className=" flex justify-center items-center">{children}</div>
    </div>
  );
};

export default ContentComponent;
