import React, { useState } from "react";

export const FunTip = ({ tipText }) => {
 return (
  <div className="p-2 bg-sky-200 rounded-xl text-lg mb-7 text-slate-900 flex flex-col">
   <div className="text-justify">{tipText}</div>
   <i className="fa-regular fa-face-grin-wink text-3xl self-end"></i>
  </div>
 );
};
