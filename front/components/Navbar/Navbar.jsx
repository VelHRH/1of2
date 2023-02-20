import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = ({ isAuth, setIsAuth }) => {
 const [isOpened, setIsOpened] = useState(false);
 const [active, setActive] = useState("categories");
 const [nightMode, setNightMode] = useState(false);
 const router = useRouter();

 useEffect(() => {
  window.localStorage.getItem("theme") && setNightMode(true);

  if (router.asPath.includes("creations")) {
   setActive("creations");
  } else if (router.asPath.includes("user")) {
   setActive("community");
  } else if (
   router.asPath.includes("login") ||
   router.asPath.includes("registration")
  ) {
   setActive("login");
  } else {
   setActive("categories");
  }
 }, []);

 useEffect(() => {
  if (nightMode) {
   document.body.classList.add("dark");
   window.localStorage.setItem("theme", "dark");
  } else {
   document.body.classList.remove("dark");
  }
 }, [nightMode]);

 const openMenu = () => {
  setIsOpened(!isOpened);
 };

 const logout = () => {
  if (window.confirm("You sure you want to log out?")) {
   window.localStorage.removeItem("token");
   window.location.href = "/";
  }
 };
 return (
  <div className={`w-20 ${isOpened && "w-[200px]"} z-10`}>
   <div
    className={`flex flex-col w-20 ${
     isOpened && "w-[200px]"
    } justify-between select-none px-3 pb-5 bg-slate-100 dark:bg-slate-900 text-slate-500 h-screen fixed`}
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
      <Link
       href={`/user/all`}
       onClick={() => {
        setActive("community");
       }}
       className={`flex items-center mb-7 ${
        active === "community" &&
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
       }`}
      >
       <i className={`fa-solid fa-user-group ${isOpened && "mr-2"}`}></i>
       <div className="text-xl">{isOpened && "community"}</div>
      </Link>
     </div>
    </div>
    <div
     className={`flex flex-col items-center px-3 w-full text-2xl cursor-pointer ${
      isOpened ? "items-start" : "items-center"
     } `}
    >
     <div
      onClick={() => {
       window.localStorage.removeItem("theme");
       setNightMode(!nightMode);
      }}
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
     {!isAuth ? (
      <Link
       href={`/login`}
       onClick={() => {
        setActive("login");
       }}
       className={`flex items-center ${
        active === "login" &&
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
       }`}
      >
       <i className={`fa-solid fa-right-to-bracket ${isOpened && "mr-2"}`}></i>
       <div className="text-xl">{isOpened && "login/register"}</div>
      </Link>
     ) : (
      <Link
       href={`/user/${isAuth.data._id}`}
       onClick={() => {
        setActive("login");
       }}
       className="flex justify-start items-center w-full"
      >
       <div className={`w-[40px] h-[40px] ${isOpened && "mr-2"}`}>
        <img
         src={isAuth.data.imgUrl}
         alt="Profile"
         className="w-full h-full object-cover rounded-full"
        />
       </div>
       <div
        onClick={logout}
        className={`text-xl ${isOpened && "p-1"} ${
         active === "login" &&
         "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 hover:text-red-500 duration-300"
        }`}
       >
        {isOpened && "logout"}
       </div>
      </Link>
     )}
    </div>
   </div>
  </div>
 );
};
