import React from "react";
import { Navbar } from "./Navbar/Navbar";

export const Layout = (props) => {
 const { children } = props;
 return (
  <div className="flex h-screen">
   <Navbar />
   <main className="flex-1">{children}</main>
  </div>
 );
};
