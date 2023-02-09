import React, { useState } from "react";
import TypewriterComponent from "typewriter-effect";

export const FunTip = ({ tipText }) => {
 return (
  <div className="p-2 bg-sky-200 rounded-xl text-lg mb-7 text-slate-900 flex flex-col">
   <TypewriterComponent
    onInit={(typewriter) => {
     typewriter.typeString(tipText).start();
    }}
   />
   <i className="fa-regular fa-face-grin-wink text-3xl self-end"></i>
  </div>
 );
};
