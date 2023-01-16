import React from "react";

export const Logo = (props) => {
 const { openMenu, isOpened } = props;
 return (
  <div
   onClick={openMenu}
   className={`text-3xl pt-3 pb-7 cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600`}
  >
   {isOpened ? "1 of 2" : "1/2"}
  </div>
 );
};
