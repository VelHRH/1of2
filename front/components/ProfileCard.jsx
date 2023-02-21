import Image from "next/dist/client/image";
import { useInView } from "react-intersection-observer";

export const ProfileCard = (props) => {
 const { children, rank, imgUrl, played, created } = props;
 const { ref, inView } = useInView();
 return (
  <div
   ref={ref}
   className={`${rank === "ruby" && "to-red-800"} ${
    rank === "gold" && "to-yellow-700"
   } ${rank === "diamond" && "to-sky-800"} ${
    rank === "common" && "to-slate-700"
   } from-slate-900 text-slate-50 ${
    inView ? "opacity-100" : "opacity-0"
   } mb-4 w-full duration-700 text-xl bg-gradient-to-tr p-2 flex flex-col items-center rounded-lg hover:scale-105 cursor-pointer`}
  >
   <Image
    loader={() => imgUrl}
    src={imgUrl}
    width={20}
    height={20}
    className="w-20 h-20 rounded-full object-cover mb-2"
   ></Image>
   <div className="w-11/12 text-center overflow-hidden">{children}</div>
   <div className="flex w-full justify-around mt-2">
    <div className="flex items-center">
     <i class="fa-solid fa-check text-sm"></i>
     <div className="ml-2">{played}</div>
    </div>

    <div className="border-l-2 border-slate-50"></div>
    <div className="flex items-center">
     <i class="fa-solid fa-plus text-sm"></i>
     <div className="ml-2">{created}</div>
    </div>
   </div>
  </div>
 );
};
