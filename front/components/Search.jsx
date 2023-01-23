export const Search = ({ searchVal, setSearchVal }) => {
 return (
  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-1 h-12 mb-8">
   <div className="flex items-center bg-slate-50 dark:bg-slate-800 w-full h-full rounded-xl p-2 px-3">
    <i className="fa-solid fa-magnifying-glass mr-3 text-[1.25rem] text-slate-400"></i>
    <input
     type="text"
     placeholder="Type to search..."
     className="bg-transparent w-full h-full text-[1.25rem] focus:outline-none text-slate-900 dark:text-slate-50"
     onChange={(e) => setSearchVal(e.target.value)}
     value={searchVal}
    />
   </div>
  </div>
 );
};
