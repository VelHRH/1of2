import Link from "next/link";
import React from "react";

export const Comment = ({ children }) => {
 return (
  <div className="flex">
   <div className="flex flex-col items-center mx-3 text-slate-500">
    <div className="mb-5 cursor-pointer hover:text-sky-500">
     <i class="fa-solid fa-arrow-up text-2xl"></i>
     <div>112</div>
    </div>
    <div className="cursor-pointer hover:text-sky-500">
     <div>24</div>
     <i class="fa-solid fa-arrow-down text-2xl"></i>
    </div>
   </div>
   <div className="dark:bg-slate-900 flex-1 bg-slate-300 p-5 rounded-xl text-xl">
    <Link href="#" className="dark:text-slate-200">
     FGhjkl;kjhij
    </Link>
    <div className="text-slate-400 mt-3">{children}</div>
   </div>
  </div>
 );
};
