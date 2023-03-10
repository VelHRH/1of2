import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { BackBtn } from "../../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import { getResults } from "../../../../components/Fetch/game/getResults";
import { ResultElement } from "../../../../components/ResultElement";
import { FunTip } from "../../../../components/FunTip";
import Image from "next/image";

export const getServerSideProps = async (context) => {
 const { category, theme, session } = await context.params;
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery(["result", category, theme, session], () =>
  getResults(category, theme, session)
 );

 const data = await getResults(category, theme, session);

 if (data.message) {
  return {
   notFound: true,
  };
 }
 return {
  props: { dehydratedState: dehydrate(queryClient) },
 };
};

const Result = () => {
 const [tipText, setTipText] = useState("");
 const [displayMode, setDisplayMode] = useState("rating");

 const router = useRouter();
 const { category, theme, session } = router.query;

 const { data, isLoading } = useQuery(
  ["result", category, theme, session],
  () => getResults(category, theme, session)
 );

 useEffect(() => {
  if (data.top[0].wins === 0) {
   setTipText(
    `Wow! You've got an interesting taste, as this is the first win for "${data.top[0].name}" here.`
   );
  } else {
   setTipText(
    `Did you know? It's just ${data.top[0].wins + 1}${
     data.top[0].wins + 1 === 2
      ? "nd"
      : data.top[0].wins + 1 === 3
      ? "rd"
      : "th"
    } win for "${data.top[0].name}" here.`
   );
  }
 }, [data.top]);

 const isGrey = (index) => {
  const eventName = data.history[index].name;
  const neighbourName =
   index % 2 === 0
    ? data.history[index + 1].name
    : data.history[index - 1].name;
  let countEvent = 0,
   countNeighbour = 0;
  for (const event of data.history) {
   if (eventName === event.name) countEvent++;
   if (neighbourName === event.name) countNeighbour++;
  }
  return (
   countEvent > countNeighbour || data.top[0].name === data.history[index].name
  );
 };

 if (isLoading) return <div>Loading...</div>;
 if (data.results.length !== data.current[2].total * 2 - 1)
  return <div>Game not finished.</div>;
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
      data.top
       .reverse()
       .map((result, index) => (
        <ResultElement
         key={index + 1}
         imgUrl={result.imgUrl}
         place={index + 1}
        />
       ))}
     {displayMode === "history" && (
      <div className="flex">
       <div className="w-1/2">
        {data.history.map(
         (result, index) =>
          index % 2 === 0 &&
          index !== data.history.length - 1 && (
           <Image
            key={index}
            loader={() => result.imgUrl}
            src={result.imgUrl}
            alt="Team1"
            width={20}
            height={20}
            className={`mb-2 h-[250px] w-full cursor-pointer object-contain ${
             !isGrey(index) && "grayscale"
            }`}
           />
          )
        )}
       </div>
       <div className="w-1/2">
        {data.history.map(
         (result, index) =>
          index % 2 === 1 && (
           <Image
            loader={() => result.imgUrl}
            key={index}
            src={result.imgUrl}
            alt="Team2"
            width={20}
            height={20}
            className={`mb-2 h-[250px] w-full cursor-pointer object-contain ${
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

export default Result;
