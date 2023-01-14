import React from "react";
import { Navbar } from "./Navbar";

export const Layout = (props) => {
 const { children } = props;
 return (
  <div className="flex bg-slate-700 h-screen">
   <Navbar />
   <main className="flex-1 bg-yellow-300">{children}</main>
  </div>
 );
};
