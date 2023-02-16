import React, { useState } from "react";

export const CommentSection = ({ submitCommentHandler }) => {
 const [text, setText] = useState("");
 return (
  <form
   onSubmit={(e) => {
    e.preventDefault();
    submitCommentHandler(text);
    setText("");
   }}
   className="flex flex-col w-full mb-5"
  >
   <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="w-full p-2 rounded-md border-4 border-sky-600 h-20 focus:outline-none bg-transparent text-slate-900 dark:text-slate-50 mt-2"
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
