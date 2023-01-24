import React from "react";
import { Navbar } from "./Navbar/Navbar";

export const Layout = (props) => {
 const { children, isAuth, setIsAuth } = props;
 return (
  <div className="flex h-screen">
   <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
   <main className="flex-1">{children}</main>
  </div>
 );
};
