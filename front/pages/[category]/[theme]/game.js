import { useState, useEffect } from "react";

const shuffle = (array) => {
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
};

export const getServerSideProps = async (context) => {
 const { category, theme, nEvents } = context.query;
 const res = await fetch(
  `http://localhost:4444/categories/${category}/${theme}/rating`
 );
 const data = await res.json();
 if (!data) {
  return {
   notFound: true,
  };
 }
 return {
  props: { events: shuffle(data).slice(0, parseFloat(nEvents)) },
 };
};

export default function Game({ events }) {
 const [curRound, setCurRound] = useState(1);
 const [eventList, setEventList] = useState(
  [...events].map((event) => ({ ...event, curLikes: 0 }))
 );
 const [stage, setStage] = useState(1);

 function powerOfTwo(x) {
  return (Math.log(x) / Math.log(2)) % 1 === 0;
 }

 const handleChoice = (index) => {
  eventList[index].curLikes++;
  if (curRound === parseInt(events.length) - 2) {
   setEventList((es) => [
    ...es,
    eventList
     .slice(curRound * 2 - 2, curRound * 2)
     .filter((event) => event.curLikes === stage)[0],
   ]);
  }
  setCurRound((round) => round + 1);
  if (curRound !== 1 && powerOfTwo(parseInt(events.length) - curRound + 1))
   setStage((s) => s + 1);
 };

 useEffect(() => {
  if (curRound !== 1 && curRound !== parseInt(events.length) - 1) {
   setEventList((es) => [
    ...es,
    eventList
     .slice((curRound - 1) * 2 - 2, (curRound - 1) * 2)
     .filter((event) => event.curLikes === stage)[0],
   ]);
  }
 }, [curRound]);

 return (
  <div className="overflow-hidden h-screen dark:bg-slate-800 dark:text-slate-50">
   <div className="mt-5 text-3xl text-center">{events[0].subcategory}</div>
   <div className="mt-1 mb-3 text-3xl text-center">
    Round: {curRound}/{events.length - 1} - Stage: {stage}
   </div>
   <div className="w-full flex h-screen">
    <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
     <img
      src={eventList[curRound * 2 - 2].imgUrl}
      alt="Choice1"
      className="w-full h-full object-cover blur-md"
     />
     <img
      onClick={() => handleChoice(curRound * 2 - 2)}
      src={eventList[curRound * 2 - 2].imgUrl}
      alt="Choice1"
      className="absolute cursor-pointer w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-cover top-[160px] md:top-[220px] md:left-[calc(80px+(100%-80px)/4)] left-1/2 translate-x-[-50%] shadow-2xl hover:-rotate-3 ease-in-out duration-300"
     />
    </div>
    <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
     <img
      src={eventList[curRound * 2 - 1].imgUrl}
      alt="Choice1"
      className="w-full h-full object-cover blur-md"
     />
     <img
      onClick={() => handleChoice(curRound * 2 - 1)}
      src={eventList[curRound * 2 - 1].imgUrl}
      alt="Choice1"
      className="absolute cursor-pointer w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-cover right-1/2 md:right-[calc((100%-80px)/4)] top-[470px] md:top-[220px] translate-x-[50%] shadow-2xl hover:rotate-3 ease-in-out duration-300"
     />
    </div>
   </div>
  </div>
 );
}
