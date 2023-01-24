import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BackBtn } from "../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import { ResultElement } from "../../../components/ResultElement";
import { FunTip } from "../../../components/FunTip";

export const getServerSideProps = async (context) => {
 const { results, category, theme } = context.query;
 await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/results`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: results,
  }
 );
 return {
  props: { results: JSON.parse(results) },
 };
};

const Results = ({ results }) => {
 const [tipText, setTipText] = useState("");
 const [displayMode, setDisplayMode] = useState("rating");
 const router = useRouter();
 const { category, theme } = router.query;

 useEffect(() => {
  if (results[results.length - 1].wins == 0) {
   setTipText(
    `Wow! You've got an interesting taste, as this is the first win for "${
     results[results.length - 1].name
    }" here.`
   );
  } else {
   setTipText(
    `Did you know? It's just ${results[results.length - 1].wins + 1}${
     results[results.length - 1].wins + 1 === 2
      ? "nd"
      : results[results.length - 1].wins + 1 === 3
      ? "rd"
      : "th"
    } win for "${results[results.length - 1].name}" here.`
   );
  }
 }, []);

 const filterRes = (res) => {
  let sortedArray = [];
  for (let i = res.length - 1; i >= 0; i--) {
   let isMatch = false;
   for (let j = 0; j < sortedArray.length; j++) {
    if (res[i]._id === sortedArray[j]._id) {
     isMatch = true;
     break;
    }
   }
   if (!isMatch) sortedArray.push(res[i]);
  }
  return sortedArray;
 };

 const isGrey = (index) => {
  const eventName = results[index].name;
  const neighbourName =
   index % 2 === 0 ? results[index + 1].name : results[index - 1].name;
  let countEvent = 0,
   countNeighbour = 0;
  for (const event of results) {
   if (eventName === event.name) countEvent++;
   if (neighbourName === event.name) countNeighbour++;
  }
  return countEvent > countNeighbour;
 };
 return (
  <>
   <Head>
    <title>Results</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <div className="w-full flex">
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
     <Link href={`/${category}/${theme}`}>
      <BackBtn>Menu</BackBtn>
     </Link>
     <h1 className="text-4xl mb-7 dark:text-slate-50 ">
      Your results for {theme}
     </h1>
     {displayMode === "rating" &&
      filterRes(results).map((result, index) => (
       <ResultElement
        key={index + 1}
        imgUrl={result.imgUrl}
        place={index + 1}
       />
      ))}
     {displayMode === "history" && (
      <div className="flex">
       <div className="w-1/2">
        {results.map(
         (result, index) =>
          index % 2 === 0 &&
          index !== results.length - 1 && (
           <img
            src={result.imgUrl}
            alt="Team1"
            className={`mb-2 h-[250px] w-full cursor-pointer object-cover ${
             !isGrey(index) && "grayscale"
            }`}
           />
          )
        )}
       </div>
       <div className="w-1/2">
        {results.map(
         (result, index) =>
          index % 2 === 1 &&
          index !== results.length - 1 && (
           <img
            src={result.imgUrl}
            alt="Team2"
            className={`mb-2 h-[250px] w-full cursor-pointer object-cover ${
             !isGrey(index) && "grayscale"
            }`}
           />
          )
        )}
       </div>
      </div>
     )}
    </div>
    <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center">
     <FunTip tipText={tipText} />
     <div
      onClick={() =>
       displayMode === "rating"
        ? setDisplayMode("history")
        : setDisplayMode("rating")
      }
      className="text-lg md:text-xl flex w-full mb-4 justify-center dark:text-slate-900 py-2 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500"
     >
      {displayMode === "rating" ? "History" : "Rating"}
     </div>
     <Link
      href={`/${category}/${theme}/rating`}
      className="text-lg md:text-xl flex w-full mb-4 items-center dark:text-slate-900 justify-center py-2 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500"
     >
      <i className="fa-solid fa-trophy mr-2"></i>
      Overall Rating
     </Link>
     <div className="text-lg md:text-xl flex w-full items-center dark:text-slate-900 justify-center py-2 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500">
      <i className="fa-solid fa-share-nodes mr-2"></i>
      Share
     </div>
    </div>
   </div>
  </>
 );
};

export default Results;
