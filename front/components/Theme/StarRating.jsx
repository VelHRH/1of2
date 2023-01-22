import { useState } from "react";

export const StarRating = ({ yourRating, setYourRating }) => {
 const [hoveredRating, setHoveredRating] = useState(0);
 return (
  <dix className="flex">
   <h1 className="text-3xl mb-3 dark:text-slate-50 mr-5">
    {yourRating !== 0 ? "" : "Rate this:"}
   </h1>
   <div className="text-slate-900 dark:text-slate-50 cursor-pointer">
    <i
     onMouseOver={() => setHoveredRating(1)}
     onMouseOut={() => setHoveredRating(0)}
     onClick={() => setYourRating(1)}
     class={`fa-star mr-1 text-3xl ${
      hoveredRating >= 1 || yourRating >= 1
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => setHoveredRating(2)}
     onMouseOut={() => setHoveredRating(0)}
     onClick={() => setYourRating(2)}
     class={`fa-star mr-1 text-3xl ${
      hoveredRating >= 2 || yourRating >= 2
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => setHoveredRating(3)}
     onMouseOut={() => setHoveredRating(0)}
     onClick={() => setYourRating(3)}
     class={`fa-star mr-1 text-3xl ${
      hoveredRating >= 3 || yourRating >= 3
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => setHoveredRating(4)}
     onMouseOut={() => setHoveredRating(0)}
     onClick={() => setYourRating(4)}
     class={`fa-star mr-1 text-3xl ${
      hoveredRating >= 4 || yourRating >= 4
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => setHoveredRating(5)}
     onMouseOut={() => setHoveredRating(0)}
     onClick={() => setYourRating(5)}
     class={`fa-star mr-1 text-3xl ${
      hoveredRating === 5 || yourRating >= 5
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
   </div>
  </dix>
 );
};
