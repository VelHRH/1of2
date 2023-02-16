import React from "react";

export const NumberBtn = ({ isClicked, children, handleModeChoice }) => {
 return (
  <div>
   <div
    className={`${
     isClicked && "bg-gradient-to-r from-cyan-500 to-blue-600"
    } p-[5px] rounded-2xl`}
   >
    <div
     onClick={() => handleModeChoice(children)}
     className={`${
      isClicked ? "text-sky-600" : "text-slate-300"
     } text-xl md:text-2xl text-center py-2 cursor-pointer rounded-xl bg-slate-700 `}
    >
     {children}
    </div>
   </div>
  </div>
 );
};
