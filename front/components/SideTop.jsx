import React from "react";

export const SideTop = (props) => {
 const { place, themes, name } = props;
 return (
  <div className="flex items-center text-xl mb-3 cursor-pointer">
   <div
    className={`rounded-xl w-12 aspect-square ${
     place === 1
      ? "bg-yellow-500"
      : place === 2
      ? "bg-slate-500"
      : place === 3
      ? "bg-orange-600"
      : "bg-sky-300"
    } mr-3 flex items-center justify-center`}
   >
    <div className="text-2xl">{themes}</div>
   </div>
   <p className="dark:text-slate-50">{name}</p>
  </div>
 );
};
