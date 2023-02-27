export const ResultElement = ({ imgUrl, place }) => {
 return (
  <div className="w-[80%] h-[150px] md:h-[200px] cursor-pointer hover:h-[200px] hover:md:h-[350px] ease-in-out duration-300 border-b-2 dark:border-slate-800 border-slate-50 flex items-center justify-between">
   <div className="text-3xl dark:text-slate-50">{place}</div>
   <img
    src={imgUrl}
    alt="Result"
    className="w-[90%] md:w-[95%] h-full object-cover object-top"
   />
  </div>
 );
};
