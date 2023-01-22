import React from "react";

export const NumberBtn = ({ isClicked, children, handleModeChoice }) => {
 return (
  <div
   onClick={() => handleModeChoice(children)}
   className={`${
    isClicked
     ? "bg-transparent text-blue-600 border-blue-600 shadow-none"
     : "bg-gradient-to-r shadow-[5px_5px] from-cyan-500 to-blue-600 dark:text-slate-50 border-slate-800 dark:border-slate-50"
   } text-xl md:text-2xl text-center py-2 border-4 dark:shadow-slate-50 shadow-slate-800 cursor-pointer rounded-2xl`}
  >
   {children}
  </div>
 );
};
