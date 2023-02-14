import Link from "next/link";
import React, { useState } from "react";

export const Comment = ({
 children,
 likes,
 dislikes,
 user,
 isLogged,
 likeComment,
 disComment,
 id,
 curUser,
 edComment,
 delComment,
}) => {
 const [isEdit, setIsEdit] = useState(false);
 const [curText, setCurText] = useState(children);
 return (
  <div className="flex mb-2">
   <div className="flex flex-col items-center mx-3 text-slate-500">
    <div
     onClick={() => {
      isLogged && likeComment(id);
     }}
     className={`mb-2 ${
      likes.includes(curUser) && "text-sky-500"
     } cursor-pointer ${isLogged && "hover:text-sky-500"}`}
    >
     <i class="fa-solid fa-arrow-up text-2xl"></i>
     <div className="text-center">{likes.length}</div>
    </div>
    <div
     onClick={() => {
      isLogged && disComment(id);
     }}
     className={`cursor-pointer ${
      dislikes.includes(curUser) && "text-sky-500"
     } ${isLogged && "hover:text-sky-500"}`}
    >
     <div className="text-center">{dislikes.length}</div>
     <i class="fa-solid fa-arrow-down text-2xl"></i>
    </div>
   </div>
   <div className="dark:bg-slate-900 flex-1 bg-slate-300 p-5 rounded-xl text-lg">
    <div className="flex justify-between">
     {!isEdit ? (
      <Link href="#" className="text-sky-500">
       {user.name}
      </Link>
     ) : (
      <button
       onClick={() => {
        setIsEdit(false);
        edComment(id, curText);
       }}
       className="bg-sky-500 text-slate-900 hover:scale-105 duration-300 px-2 rounded-md mb-2"
      >
       OK
      </button>
     )}
     {!isEdit && curUser === user.id && (
      <div className="flex">
       <i
        onClick={() => setIsEdit(true)}
        class="fa-solid fa-pen-to-square text-slate-500 cursor-pointer hover:scale-105 hover:text-sky-500 duration-300"
       ></i>
       <i
        onClick={() => delComment(id)}
        class="fa-solid fa-trash text-slate-500 cursor-pointer hover:scale-105 hover:text-red-500 duration-300 ml-3"
       ></i>
      </div>
     )}
    </div>
    {!isEdit ? (
     <div className="text-slate-400 mt-3">{curText}</div>
    ) : (
     <textarea
      className="bg-slate-800 w-full text-slate-400 rounded-md p-2 font-typewriter"
      value={curText}
      onChange={(e) => setCurText(e.target.value)}
     ></textarea>
    )}
   </div>
  </div>
 );
};
