import Head from "next/head";
import { Category } from "../components/Category";
import { Search } from "../components/Search";
import { useState } from "react";
import { SideTop } from "../components/SideTop";

export const getStaticProps = async () => {
 const res = await fetch("http://localhost:4444/categories");
 const data = await res.json();
 return {
  props: { categories: data },
 };
};

export default function Home({ categories }) {
 const [searchVal, setSearchVal] = useState("");

 return (
  <div className="w-full flex">
   <Head>
    <title>Create Next App</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className="flex-1 h-screen bg-slate-50 dark:bg-slate-800">
    <Search searchVal={searchVal} setSearchVal={setSearchVal} />

    <div className="grid gap-4 grid-cols-3 mx-10">
     {categories.map(
      (category) =>
       category.name.slice(0, searchVal.length) === searchVal && (
        <Category key={category._id}>{category.name}</Category>
       )
     )}
    </div>
   </div>
   <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen">
    <div className="flex flex-col items-start px-10">
     {[...categories]
      .sort((a, b) => b.subcategories.length - a.subcategories.length)
      .slice(0, 10)
      .map((category, index) => (
       <SideTop
        key={index}
        place={index + 1}
        themes={category.subcategories.length}
        name={category.name.toUpperCase()}
       />
      ))}
    </div>
   </div>
  </div>
 );
}
