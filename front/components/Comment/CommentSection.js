import React from "react";

export const CommentSection = () => {
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Success");
 };
 return (
  <form onSubmit={handleSubmit} className="flex flex-col w-full mb-5">
   <textarea
    className="w-full p-2 rounded-md border-2 border-slate-500 h-20 bg-transparent text-slate-900 dark:text-slate-50 mt-10"
    placeholder="Your comment..."
   ></textarea>
   <button
    type="submit"
    className="bg-gradient-to-r from-cyan-500 to-blue-600 py-2 px-3 rounded-2xl self-end mt-2 hover:scale-105 duration-300"
   >
    Comment
   </button>
  </form>
 );
};
