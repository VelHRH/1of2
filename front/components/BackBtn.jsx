export const BackBtn = ({ children }) => {
 return (
  <div className="inline-flex items-center mb-3 text-2xl text-slate-500 cursor-pointer hover:scale-110 ease-in-out duration-300">
   <i className="fa-solid fa-chevron-left mr-2"></i>
   <h1 className="capitalize">{children}</h1>
  </div>
 );
};
