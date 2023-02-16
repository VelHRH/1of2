import React from "react";

export const AlertMessage = ({ children }) => {
 return (
  <div className="flex flex-col text-lg duration-300 bg-red-200 text-slate-900 fixed right-3 bottom-3 p-1 rounded-lg w-[22%]">
   <div className="">{children}</div>
   <i class="fa-regular fa-face-frown text-3xl self-end"></i>
  </div>
 );
};
