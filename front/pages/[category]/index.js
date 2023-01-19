import { useState } from "react";
import Head from "next/head";
import { Search } from "../../components/Search";
import { FunTip } from "../../components/FunTip";
import { Theme } from "../../components/Theme/Theme";
import { useRouter } from "next/router";
import Link from "next/link";
import { BackBtn } from "../../components/BackBtn";
import { SideTop } from "../../components/SideTop";

export const getServerSideProps = async (context) => {
 const { category } = context.params;
 const res = await fetch(`http://localhost:4444/categories/${category}`);
 const data = await res.json();
 if (!data) {
  return {
   notFound: true,
  };
 }
 return {
  props: { themes: data },
 };
};

const Category = ({ themes }) => {
 const [searchVal, setSearchVal] = useState("");

 const router = useRouter();
 const { category } = router.query;

 const CountStars = (arr) => {
  let sum = 0;
  arr.map((item) => (sum += item.stars));
  return sum / arr.length;
 };

 return (
  <div className="w-full flex">
   <Head>
    <title>{category.charAt(0).toUpperCase() + category.slice(1)}</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <div className="flex-1 h-screen bg-slate-50 dark:bg-slate-800 p-10">
    <Link href={`/`}>
     <BackBtn>Categories</BackBtn>
    </Link>
    <h1 className="text-4xl mb-7 dark:text-slate-50 capitalize">{category}</h1>
    <Search searchVal={searchVal} setSearchVal={setSearchVal} />

    <div className="grid gap-4 grid-cols-2">
     {themes.map(
      (theme) =>
       theme.name.slice(0, searchVal.length).toUpperCase() ===
        searchVal.toUpperCase() && (
        <Theme
         name={theme.name}
         stars={CountStars(theme.stars)}
         imgUrl={theme.imgUrl}
         author={theme.author}
         description={theme.description}
        />
       )
     )}
    </div>
   </div>
   <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen">
    <div className="flex flex-col items-start px-10 pt-10">
     <FunTip
      tipText={`These are the themes available in ${category} category. All of them were created by our admins, so there are not so many of them. You can find even more topics in the community creations section.`}
     ></FunTip>
     <h1 className="text-2xl text-slate-500 mb-3 self-center">
      Popular themes here:
     </h1>
     {[...themes]
      .sort((a, b) => b.stars.length - a.stars.length)
      .slice(0, 5)
      .map((theme, index) => (
       <SideTop
        key={index}
        place={index + 1}
        themes={theme.stars.length}
        name={theme.name.toUpperCase()}
       />
      ))}
    </div>
   </div>
  </div>
 );
};

export default Category;
