export const Input = ({ inputValue, setInputValue }) => {
 return (
  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-1 h-12 mb-8 flex-1">
   <input
    type="text"
    placeholder="Type to search..."
    className="bg-slate-50 dark:bg-slate-800 w-full h-full text-lg px-2 focus:outline-none text-slate-900 dark:text-slate-50"
    onChange={(e) => setInputValue(e.target.value)}
    value={inputValue}
   />
  </div>
 );
};
