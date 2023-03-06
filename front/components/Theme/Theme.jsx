export const Theme = (props) => {
 const { name, imgUrl, description, author, stars } = props;
 return (
  <div className="group cursor-pointer">
   <div className="group-hover:scale-105 h-[250px] ease-in-out duration-500">
    <img
     src={imgUrl}
     alt="Theme"
     className="w-full h-full object-cover rounded-t-2xl"
    />
    <div className="bg-slate-200 dark:bg-slate-900 rounded-b-2xl flex flex-col p-2">
     <div
      className={`flex justify-between text-xl items-center rounded-lg text-slate-900 dark:text-slate-50 mb-3`}
     >
      <div className="border-2 border-sky-500 rounded-lg p-1">{author}</div>
      <div className="self-center text-center flex-1 px-2 h-[2.5em]">
       {name}
      </div>
      <div className="flex items-center border-2 border-sky-500 rounded-lg p-1">
       <i className="fa-regular fa-star mr-1 text-2xl"></i>
       {stars.toFixed(2)}
      </div>
     </div>
     <p className="text-justify text-slate-500 h-[1.25em] overflow-hidden">
      {description}
     </p>
    </div>
   </div>
  </div>
 );
};
