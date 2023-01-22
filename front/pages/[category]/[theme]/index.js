import { useState } from "react";
import { NumberBtn } from "../../../components/NumberBtn";
import { BackBtn } from "../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import ChartRatings from "../../../components/ChartRatings";
import { StarRating } from "../../../components/Theme/StarRating";
import { FullEvenView } from "../../../components/FullEvenView";

export const getServerSideProps = async (context) => {
 const { category, theme } = context.params;
 const resTheme = await fetch(
  `http://localhost:4444/categories/${category}/${theme}`
 );
 const dataTheme = await resTheme.json();
 if (!dataTheme) {
  return {
   notFound: true,
  };
 }
 const resRating = await fetch(
  `http://localhost:4444/categories/${category}/${theme}/rating`
 );
 const dataRating = await resRating.json();
 return {
  props: { theme: dataTheme[0], rating: dataRating.slice(0, 2) },
 };
};

const Theme = ({ theme, rating }) => {
 const [clickedMode, setClickedMode] = useState("8");
 const [yourRating, setYourRating] = useState(0);
 const [isEventOpened, setIsEventOpened] = useState(-1);
 const handleModeChoice = (mode) => {
  setClickedMode(mode);
 };

 const DataRatings = () => {
  let nOf5 = 0,
   nOf4 = 0,
   nOf3 = 0,
   nOf2 = 0,
   nOf1 = 0;
  for (let i of theme.stars) {
   if (i.stars === 5) nOf5++;
   if (i.stars === 4) nOf4++;
   if (i.stars === 3) nOf3++;
   if (i.stars === 2) nOf2++;
   if (i.stars === 1) nOf1++;
  }
  return [
   {
    avg:
     (nOf5 * 5 + nOf4 * 4 + nOf3 * 3 + nOf2 * 2 + nOf1 * 1) /
     (nOf5 + nOf4 + nOf3 + nOf2 + nOf1),
   },
   nOf1 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf1 },
   nOf2 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf2 },
   nOf3 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf3 },
   nOf4 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf4 },
   nOf5 !== 0 && {
    value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf5,
   },
  ];
 };

 return (
  <>
   {isEventOpened > -1 && (
    <FullEvenView
     setIsEventOpened={setIsEventOpened}
     link={rating[isEventOpened].imgUrl}
     name={rating[isEventOpened].name}
     wins={rating[isEventOpened].wins}
     likes={rating[isEventOpened].likes}
     dislikes={rating[isEventOpened].dislikes}
    />
   )}
   <div className="w-full flex">
    <Head>
     <title>{theme.name}</title>
     <meta name="description" content="Generated by create next app" />
     <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
     <Link href={`/${theme.category}`}>
      <BackBtn>{theme.category}</BackBtn>
     </Link>
     <div className="flex justify-between w-full">
      <h1 className="text-4xl mb-7 dark:text-slate-50 capitalize">
       {theme.name}
      </h1>
      <StarRating yourRating={yourRating} setYourRating={setYourRating} />
     </div>
     <img
      src={theme.imgUrl}
      alt="Subcategory"
      className="h-[350px] w-full object-cover"
     />
     <div className="grid gap-4 grid-cols-4 mt-5 w-full">
      <NumberBtn
       isClicked={clickedMode === "8"}
       handleModeChoice={handleModeChoice}
      >
       8
      </NumberBtn>
      <NumberBtn
       isClicked={clickedMode === "16"}
       handleModeChoice={handleModeChoice}
      >
       16
      </NumberBtn>
      <NumberBtn
       isClicked={clickedMode === "32"}
       handleModeChoice={handleModeChoice}
      >
       32
      </NumberBtn>
      <NumberBtn
       isClicked={clickedMode === "64"}
       handleModeChoice={handleModeChoice}
      >
       64
      </NumberBtn>
      <Link
       href={`/1of2/${theme.category}/${theme.name}/rating`}
       className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center"
      >
       <i class="fa-solid fa-trophy mr-2"></i>
       Rating
      </Link>
      <div className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center">
       <i class="fa-solid fa-share-nodes mr-2"></i>
       Share
      </div>
      <div
       onClick={() => setIsGame(true)}
       className="text-xl md:text-2xl col-span-2 flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-lime-500 to-green-600 cursor-pointer rounded-2xl hover:scale-105 ease-in-out duration-500"
      >
       Start
      </div>
     </div>
    </div>
    <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center">
     <h1 className="text-3xl mb-5 dark:text-slate-50">
      Community: {DataRatings()[0].avg.toFixed(2)}
     </h1>
     <ChartRatings data={DataRatings().slice(1)} />
     <div className="text-xl dark:text-slate-50 mt-5">
      Based on {theme.stars.length} votes
     </div>
     <h1 className="text-3xl mb-5 mt-16 dark:text-slate-50">
      Top in this theme:
     </h1>
     {rating.map((r, index) => (
      <div className="h-[100px] w-full mb-3">
       <div className="w-full h-full flex justify-between items-center text-2xl">
        <img
         onClick={() => setIsEventOpened(index)}
         src={r.imgUrl}
         alt="Top"
         className="h-full aspect-square object-cover rounded-full cursor-pointer"
        />
        <h1 className="dark:text-slate-50">{r.wins} wins</h1>
       </div>
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default Theme;
