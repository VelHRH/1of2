import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import Link from "next/link";

export const Navbar = () => {
 const [isOpened, setIsOpened] = useState(false);
 const [active, setActive] = useState("categories");
 const [nightMode, setNightMode] = useState(false);
 useEffect(() => {
  if (nightMode) {
   document.body.classList.add("dark");
  } else {
   document.body.classList.remove("dark");
  }
 }, [nightMode]);

 const openMenu = () => {
  setIsOpened(!isOpened);
 };
 return (
  <div className={`w-20 ${isOpened && "w-[200px]"} z-10`}>
   <div
    className={`flex flex-col w-20 ${
     isOpened && "w-[200px]"
    } justify-between select-none px-3 bg-slate-100 dark:bg-slate-900 text-slate-500 h-screen fixed`}
   >
    <div className="flex flex-col items-center w-full">
     <Logo openMenu={openMenu} isOpened={isOpened} />
     <div
      className={`pt-7 border-t-2 border-slate-400 flex w-full flex-col px-3 text-2xl cursor-pointer ${
       isOpened ? "items-start" : "items-center"
      } `}
     >
      <Link
       href={`/`}
       onClick={() => {
        setActive("categories");
       }}
       className={`flex items-center mb-7 ${
        active === "categories" &&
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
       }`}
      >
       <i className={`fa-solid fa-house ${isOpened && "mr-2"}`}></i>
       <div className="text-xl">{isOpened && "categories"}</div>
      </Link>
      <Link
       href={`/creations`}
       onClick={() => {
        setActive("creations");
       }}
       className={`flex items-center mb-7 ${
        active === "creations" &&
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
       }`}
      >
       <i className={`fa-solid fa-briefcase ${isOpened && "mr-3"}`}></i>
       <div className="text-xl">{isOpened && "creations"}</div>
      </Link>
      <div
       onClick={() => {
        setActive("users");
       }}
       className={`flex items-center mb-7 ${
        active === "users" &&
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
       }`}
      >
       <i className={`fa-solid fa-user-group ${isOpened && "mr-2"}`}></i>
       <div className="text-xl">{isOpened && "users"}</div>
      </div>
     </div>
    </div>
    <div
     className={`flex flex-col items-center px-3 w-full text-2xl cursor-pointer ${
      isOpened ? "items-start" : "items-center"
     } `}
    >
     <div
      onClick={() => setNightMode(!nightMode)}
      className={`flex items-center mb-7 ${
       isOpened ? "self-start" : "self-center"
      }`}
     >
      <i
       className={`fa-solid ${nightMode ? "fa-sun" : "fa-moon"} ${
        isOpened && "mr-3"
       }`}
      ></i>
      <div className="text-xl">{isOpened && "switch mode"}</div>
     </div>
     <div className={`flex items-center mb-7`}>
      <i className={`fa-solid fa-right-to-bracket ${isOpened && "mr-2"}`}></i>
      <div className="text-xl">{isOpened && "login/register"}</div>
     </div>
    </div>
   </div>
  </div>
 );
};
