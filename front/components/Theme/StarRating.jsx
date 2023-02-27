import { useEffect, useState } from "react";

export const StarRating = ({ rating, starClickHandler }) => {
 const [hoveredRating, setHoveredRating] = useState(0);
 return (
  <div className="flex flex-col">
   <h1 className="text-xl mb-1 dark:text-slate-50 self-end">
    {rating !== 0 ? "" : "Rate this:"}
   </h1>
   <div className="text-slate-900 dark:text-slate-50 cursor-pointer">
    <i
     onMouseOver={() => rating === 0 && setHoveredRating(1)}
     onMouseOut={() => rating === 0 && setHoveredRating(0)}
     onClick={() => rating === 0 && starClickHandler(1)}
     className={`fa-star mr-1 text-3xl ${
      hoveredRating >= 1 || rating >= 1
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => rating === 0 && setHoveredRating(2)}
     onMouseOut={() => rating === 0 && setHoveredRating(0)}
     onClick={() => rating === 0 && starClickHandler(2)}
     className={`fa-star mr-1 text-3xl ${
      hoveredRating >= 2 || rating >= 2
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => rating === 0 && setHoveredRating(3)}
     onMouseOut={() => rating === 0 && setHoveredRating(0)}
     onClick={() => rating === 0 && starClickHandler(3)}
     className={`fa-star mr-1 text-3xl ${
      hoveredRating >= 3 || rating >= 3
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => rating === 0 && setHoveredRating(4)}
     onMouseOut={() => rating === 0 && setHoveredRating(0)}
     onClick={() => rating === 0 && starClickHandler(4)}
     className={`fa-star mr-1 text-3xl ${
      hoveredRating >= 4 || rating >= 4
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
    <i
     onMouseOver={() => rating === 0 && setHoveredRating(5)}
     onMouseOut={() => rating === 0 && setHoveredRating(0)}
     onClick={() => rating === 0 && starClickHandler(5)}
     className={`fa-star mr-1 text-3xl ${
      hoveredRating === 5 || rating >= 5
       ? "text-sky-500 fa-solid"
       : "text-slate-900 dark:text-slate-50 fa-regular"
     }`}
    ></i>
   </div>
  </div>
 );
};
