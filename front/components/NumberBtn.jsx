import React from "react";

export const NumberBtn = ({
 isClicked,
 children,
 handleModeChoice,
 isVisible,
}) => {
 return (
  <div className={`${isVisible ? "opacity-100" : "opacity-0"}`}>
   <div
    className={`${
     isClicked && "bg-gradient-to-r from-cyan-500 to-blue-600"
    } p-[5px] rounded-2xl`}
   >
    <div
     onClick={() => isVisible && handleModeChoice(children)}
     className={`${
      isClicked ? "text-sky-600" : "dark:text-slate-300 text-slate-600"
     } text-xl md:text-2xl text-center py-2 cursor-pointer rounded-xl dark:bg-slate-700 bg-slate-200`}
    >
     {children}
    </div>
   </div>
  </div>
 );
};
