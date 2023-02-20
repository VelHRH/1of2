import Image from "next/dist/client/image";

export const ProfileCard = (props) => {
 const { children, rank } = props;
 return (
  <div
   className={`${rank === "ruby" && "to-red-800"} ${
    rank === "gold" && "to-yellow-700"
   } ${rank === "diamond" && "to-sky-800"} ${
    rank === "common" && "to-slate-700"
   } from-slate-900 text-slate-50 mb-4 w-full text-xl bg-gradient-to-tr p-2 flex flex-col items-center rounded-lg hover:scale-105 duration-300 cursor-pointer`}
  >
   <Image
    loader={() =>
     "https://www.si.com/.image/t_share/MTg3ODgwOTE2OTAxNzAwNjYy/kdb-vs-utd-1.jpg"
    }
    src={
     "https://www.si.com/.image/t_share/MTg3ODgwOTE2OTAxNzAwNjYy/kdb-vs-utd-1.jpg"
    }
    width={20}
    height={20}
    className="w-20 h-20 rounded-full object-cover mb-2"
   ></Image>
   <div className="w-11/12 text-center overflow-hidden">{children}</div>
   <div className="flex w-full justify-around mt-2">
    <div className="flex items-center">
     <i class="fa-solid fa-check text-sm"></i>
     <div className="ml-2">12</div>
    </div>

    <div className="border-l-2 border-slate-50"></div>
    <div className="flex items-center">
     <i class="fa-solid fa-plus text-sm"></i>
     <div className="ml-2">5</div>
    </div>
   </div>
  </div>
 );
};
