import Link from "next/link";
import React from "react";

export const Comment = ({ children, likes, dislikes, user, isLogged, likeComment, disComment, id, curUser, disIsBlue }) => {
 return (
  <div className="flex mb-2">
   <div className="flex flex-col items-center mx-3 text-slate-500">
    <div onClick={() => {isLogged && likeComment(id)}} className={`mb-2 ${likes.includes(curUser) && "text-sky-500"} cursor-pointer ${isLogged && "hover:text-sky-500"}`}>
     <i class="fa-solid fa-arrow-up text-2xl"></i>
     <div className="text-center">{likes.length}</div>
    </div>
    <div onClick={() => {isLogged && disComment(id)}} className={`cursor-pointer ${dislikes.includes(curUser) && "text-sky-500"} ${isLogged && "hover:text-sky-500"}`}>
     <div className="text-center">{dislikes.length}</div>
     <i class="fa-solid fa-arrow-down text-2xl"></i>
    </div>
   </div>
   <div className="dark:bg-slate-900 flex-1 bg-slate-300 p-5 rounded-xl text-xl">
    <Link href="#" className="text-sky-500">
     {user}
    </Link>
    <div className="text-slate-400 mt-3">{children}</div>
   </div>
  </div>
 );
};
