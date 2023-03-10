import Image from "next/image";
import React from "react";

export const Winner = ({ image, date }) => {
 return (
  <div className="flex relative group cursor-pointer bg-slate-900 rounded-lg">
   <Image
    loader={() => image}
    src={image}
    alt="Winner"
    width={20}
    height={20}
    className="group-hover:opacity-0 w-full aspect-square object-cover rounded-lg ease-in-out duration-300"
   />
   <span
    class="group-hover:opacity-100 transition-opacity px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-0"
   >
    {date.slice(8, 10)}.{date.slice(5, 7)}.{date.slice(0, 4)}
   </span>
  </div>
 );
};
