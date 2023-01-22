
import { useState } from "react";

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
}

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

 return (
  <div className="w-full flex">
   {events.map(e => <div>{e.name}</div>)}
  </div>
 );
}
