import React from "react";

export const Theme = (props) => {
 const { name, imgUrl, description, author, stars } = props;
 return (
  <div className="group cursor-pointer">
   <div className="group-hover:scale-110 h-[250px] ease-in-out duration-500">
    <img
     src={imgUrl}
     alt="Theme"
     className="w-full h-full object-cover rounded-t-2xl"
    />
    <div className="bg-slate-200 rounded-b-2xl flex flex-col p-2">
     <div className="flex justify-between items-center">
      <div>{author}</div>
      <h1 className="text-xl self-center">{name}</h1>
      <div>
       <i class="fa-regular fa-star mr-1 text-2xl"></i>
       3.55
      </div>
     </div>
     <p className="text-justify">{description}</p>
    </div>
   </div>
  </div>
 );
};
