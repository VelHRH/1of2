import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Rating.module.css";
import { useQuery } from "react-query";
import { getAllThemes } from "../Fetch/getAllThemes";
import { getUser } from "../Fetch/getUser";

export const Navbar = () => {
 const [isOpened, setIsOpened] = useState(false);
 const [active, setActive] = useState("categories");
 const [nightMode, setNightMode] = useState(false);
 const router = useRouter();

 const themes = useQuery("themes", () => getAllThemes());
 const me = useQuery("me", () =>
  getUser(`${window.localStorage.getItem("token")}`)
 );

 useEffect(() => {
  window.localStorage.getItem("theme") && setNightMode(true);
 }, []);

 useEffect(() => {
  setIsOpened(false);
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
 }, [router.asPath]);

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

 if (themes.isLoading || me.isLoading) return <div>Loading...</div>;
 return (
  <div className={`w-20 ${isOpened && "w-[200px]"} z-10 h-screen`}>
   <div
    className={`flex flex-col w-20 ${
     isOpened && "w-[200px]"
    } justify-between overflow-y-scroll ${
     styles.nobar
    } select-none px-3 pb-5 bg-slate-100 dark:bg-slate-900 text-slate-500 h-screen fixed`}
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
       <i className={`fa-solid fa-plus ${isOpened && "mr-3"}`}></i>
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
     {!me.data.message ? (
      <div
       className={`pt-7 border-t-2 border-slate-400 flex w-full flex-col px-3 text-2xl cursor-pointer ${
        isOpened ? "items-start" : "items-center"
       } `}
      >
       {me.data.favourite.map((fav) => (
        <Link
         key={fav}
         href={`/${
          themes.data.filter((obj) => {
           return obj.name === fav;
          })[0].category
         }/${
          themes.data.filter((obj) => {
           return obj.name === fav;
          })[0].name
         }`}
         className="w-full"
        >
         <Image
          loader={() =>
           themes.data.filter((obj) => {
            return obj.name === fav;
           })[0].imgUrl
          }
          src={
           themes.data.filter((obj) => {
            return obj.name === fav;
           })[0].imgUrl
          }
          alt="Theme Pic"
          width={200}
          height={500}
          className={`w-full object-cover mb-5 ${
           isOpened ? "h-12 rounded-lg w-full" : "aspect-square rounded-full "
          }`}
         />
        </Link>
       ))}
      </div>
     ) : null}
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
     {me.data.message ? (
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
      <div className="flex justify-start items-center w-full">
       <Link
        href={`/user/${me.data._id}`}
        onClick={() => {
         setActive("login");
        }}
        className={`w-[40px] h-[40px] ${isOpened && "mr-2"}`}
       >
        <Image
         loader={() => me.data.imgUrl}
         src={me.data.imgUrl}
         width={20}
         height={20}
         alt="Profile"
         className="w-full h-full object-cover rounded-full"
        />
       </Link>

       <div
        onClick={logout}
        className={`text-xl ${
         isOpened && "p-1"
        } text-slate-500 flex-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-center hover:bg-red-300 dark:hover:bg-red-300 hover:text-slate-600 duration-300`}
       >
        {isOpened && "logout"}
       </div>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};
