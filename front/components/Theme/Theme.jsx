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
      <div>{author}</div>
      <div className="self-center text-center">{name}</div>
      <div>
       <i className="fa-regular fa-star mr-1 text-2xl"></i>
       {stars.toFixed(2)}
      </div>
     </div>
     <p className="text-justify text-slate-500">{description}</p>
    </div>
   </div>
  </div>
 );
};
