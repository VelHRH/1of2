import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Game = ({ clickedMode, setIsGame }) => {
 const router = useRouter();
 const { category, theme } = router.query;
 const [isLoading, setIsLoading] = useState(true);
 const [events, setEvents] = useState();
 const [curRound, setCurRound] = useState(1);
 const [stage, setStage] = useState(1);

 function shuffle(array) {
  let currentIndex = array.length,
   randomIndex;

  while (currentIndex != 0) {
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;

   [array[currentIndex], array[randomIndex]] = [
    array[randomIndex],
    array[currentIndex],
   ];
  }
  return array;
 }

 function powerOfTwo(x) {
  return (Math.log(x) / Math.log(2)) % 1 === 0;
 }

 useEffect(() => {
  document.title = "Game";
  setIsLoading(true);
  fetch(`${process.env.API_HOST}/categories/${category}/${theme}/rating`)
   .then((res) => res.json())
   .then((data) => {
    setEvents(
     shuffle(data.filter((event) => event.subcategory === theme))
      .slice(0, parseInt(clickedMode))
      .map((event) => ({ ...event, curLikes: 0 }))
    );
   })
   .finally(() => setIsLoading(false));
 }, []);

 useEffect(() => {
  if (curRound !== 1 && curRound !== parseInt(clickedMode) - 1) {
   setEvents((eventList) => [
    ...eventList,
    events
     .slice((curRound - 1) * 2 - 2, (curRound - 1) * 2)
     .filter((event) => event.curLikes === stage)[0],
   ]);
  }
 }, [curRound]);

 const handleChoice = (index) => {
  events[index].curLikes++;

  if (curRound === parseInt(clickedMode - 1)) {
   router.push(
    {
     pathname: `/${category}/${theme}/results`,
     query: {
      results: JSON.stringify([
       ...events,
       events
        .slice(curRound * 2 - 2, curRound * 2)
        .filter((event) => event.curLikes === stage + 1)[0],
      ]),
     },
    },
    `/${category}/${theme}/results`
   );
   setIsGame("loading");
  }

  if (curRound === parseInt(clickedMode) - 2) {
   setEvents((eventList) => [
    ...eventList,
    events
     .slice(curRound * 2 - 2, curRound * 2)
     .filter((event) => event.curLikes === stage)[0],
   ]);
  }
  setCurRound((round) => round + 1);
  if (curRound !== 1 && powerOfTwo(parseInt(clickedMode) - curRound + 1))
   setStage((s) => s + 1);
 };

 return (
  <div className="overflow-hidden h-screen dark:bg-slate-800 dark:text-slate-50">
   {isLoading ? (
    <div>Loading...</div>
   ) : (
    <>
     <div className="mt-5 text-3xl text-center">{theme}</div>
     <div className="mt-1 mb-3 text-3xl text-center">
      Round: {curRound}/{parseInt(clickedMode) - 1} - Stage:{" "}
      {Math.log2(parseInt(clickedMode) - curRound + 1) % 1 !== 0 ||
      curRound === 1
       ? stage
       : stage + 1}
      /{Math.log2(parseInt(clickedMode))}
     </div>
     <div className="w-full flex h-screen">
      <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
       <img
        src={events[curRound * 2 - 2].imgUrl}
        alt="Choice1"
        className="w-full h-full object-cover blur-md"
       />
       <img
        onClick={() => handleChoice(curRound * 2 - 2)}
        src={events[curRound * 2 - 2].imgUrl}
        alt="Choice1"
        className="absolute cursor-pointer w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-cover top-[160px] md:top-[220px] md:left-[calc(80px+(100%-80px)/4)] left-1/2 translate-x-[-50%] shadow-2xl hover:-rotate-3 ease-in-out duration-300"
       />
      </div>
      <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
       <img
        src={events[curRound * 2 - 1].imgUrl}
        alt="Choice1"
        className="w-full h-full object-cover blur-md"
       />
       <img
        onClick={() => handleChoice(curRound * 2 - 1)}
        src={events[curRound * 2 - 1].imgUrl}
        alt="Choice1"
        className="absolute cursor-pointer w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-cover right-1/2 md:right-[calc((100%-80px)/4)] top-[470px] md:top-[220px] translate-x-[50%] shadow-2xl hover:rotate-3 ease-in-out duration-300"
       />
      </div>
     </div>
    </>
   )}
  </div>
 );
};
