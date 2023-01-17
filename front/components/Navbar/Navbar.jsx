import { useState } from "react";
import { Logo } from "./Logo";

export const Navbar = () => {
 const [isOpened, setIsOpened] = useState(false);
 const [active, setActive] = useState("categories");

 const openMenu = () => {
  setIsOpened(!isOpened);
 };
 return (
  <div className="flex flex-col justify-between px-3 bg-slate-100 text-slate-400">
   <div className="flex flex-col items-center w-full">
    <Logo openMenu={openMenu} isOpened={isOpened} />
    <div
     className={`pt-7 border-t-2 border-slate-400 flex w-full flex-col px-3 text-2xl cursor-pointer ${
      isOpened ? "items-start" : "items-center"
     } `}
    >
     <div
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
     </div>
     <div
      onClick={() => {
       setActive("creations");
      }}
      className={`flex items-center mb-7 ${
       active === "creations" &&
       "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
      }`}
     >
      <i class={`fa-solid fa-briefcase ${isOpened && "mr-3"}`}></i>
      <div className="text-xl">{isOpened && "creations"}</div>
     </div>
     <div
      onClick={() => {
       setActive("users");
      }}
      className={`flex items-center mb-7 ${
       active === "users" &&
       "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
      }`}
     >
      <i class={`fa-solid fa-user-group ${isOpened && "mr-2"}`}></i>
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
     className={`flex items-center mb-7 ${
      isOpened ? "self-start" : "self-center"
     }`}
    >
     <i className={`fa-solid dark:fa-sun fa-moon ${isOpened && "mr-3"}`}></i>
     <div className="text-xl">{isOpened && "switch mode"}</div>
    </div>
    <div className={`flex items-center mb-7`}>
     <i className={`fa-solid fa-right-to-bracket ${isOpened && "mr-2"}`}></i>
     <div className="text-xl">{isOpened && "login/register"}</div>
    </div>
   </div>
  </div>
 );
};
