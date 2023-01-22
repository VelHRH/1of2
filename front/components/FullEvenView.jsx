export const FullEvenView = ({
 setIsEventOpened,
 link,
 name,
 wins,
 likes,
 dislikes,
}) => {
 return (
  <>
   <div
    onClick={() => setIsEventOpened(-1)}
    className="fixed left-0 top-0 w-screen h-screen overscroll-none bg-slate-800 z-30 opacity-90"
   ></div>
   <img
    src={link}
    alt="Image"
    className="w-[800px] h-[450px] object-cover fixed left-[50%] translate-x-[-50%] top-10 z-40"
   />
   <div className="flex flex-col fixed bottom-20 left-[50%] translate-x-[-50%] z-50 items-center">
    <div className="text-yellow-400 text-4xl mb-4">{name}</div>
    <div className="flex">
     <div className="flex flex-col text-green-400 text-2xl items-center">
      <div className="mb-1">Clicks:</div>
      <div className="flex items-center">
       <i class="fa-solid fa-computer-mouse mr-2"></i>
       <div>{likes}</div>
      </div>
     </div>
     <div className="flex flex-col text-yellow-400 text-3xl items-center mx-40">
      <div className="mb-1">Wins:</div>
      <div className="flex items-center">
       <i class="fa-solid fa-trophy mr-2"></i>
       <div>{wins}</div>
      </div>
     </div>
     <div className="flex flex-col text-red-400 text-2xl items-center">
      <div className="mb-1">Misses:</div>
      <div className="flex items-center">
       <i class="fa-solid fa-circle-xmark mr-2"></i>
       <div>{dislikes}</div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
