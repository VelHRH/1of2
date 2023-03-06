import { NumberBtn } from "./NumberBtn";
import jwt_decode from "jwt-decode";
import Link from "next/link";

export const ThemePanel = ({
 setClickedMode,
 startClickHandler,
 clickedMode,
 ratingLink,
 maxElements,
}) => {
 const handleModeChoice = (mode) => {
  setClickedMode(mode);
 };
 return (
  <div className="grid gap-4 grid-cols-4 mt-5 w-full mb-10">
   <NumberBtn
    isClicked={clickedMode === "8"}
    isVisible={maxElements >= 8}
    handleModeChoice={handleModeChoice}
   >
    8
   </NumberBtn>
   <NumberBtn
    isClicked={clickedMode === "16"}
    isVisible={maxElements >= 16}
    handleModeChoice={handleModeChoice}
   >
    16
   </NumberBtn>
   <NumberBtn
    isClicked={clickedMode === "32"}
    isVisible={maxElements >= 32}
    handleModeChoice={handleModeChoice}
   >
    32
   </NumberBtn>
   <NumberBtn
    isClicked={clickedMode === "64"}
    isVisible={maxElements >= 64}
    handleModeChoice={handleModeChoice}
   >
    64
   </NumberBtn>
   <Link
    href={ratingLink}
    className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center"
   >
    <i className="fa-solid fa-trophy mr-2"></i>
    Rating
   </Link>
   <div className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center">
    <i className="fa-solid fa-share-nodes mr-2"></i>
    Share
   </div>

   <div
    onClick={() =>
     startClickHandler(
      window.localStorage.getItem("token")
       ? jwt_decode(window.localStorage.getItem("token"))._id
       : null
     )
    }
    className="text-xl md:text-2xl col-span-2 flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-lime-500 to-green-600 cursor-pointer rounded-2xl hover:scale-105 ease-in-out duration-500"
   >
    Start
   </div>
  </div>
 );
};
