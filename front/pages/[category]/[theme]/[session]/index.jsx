import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery, useMutation } from "react-query";
import { getCurr } from "../../../../components/Fetch/game/getCurr";
import { nextEvents } from "../../../../components/Fetch/game/nextEvents";
import { saveResults } from "../../../../components/Fetch/game/saveResults";

const Game = () => {
 const router = useRouter();
 const { category, theme, session } = router.query;

 const curr = useQuery(["game", category, theme, session], () =>
  getCurr(category, theme, session)
 );

 const nextMutation = useMutation({
  mutationFn: ({ category, theme, session, choice }) =>
   nextEvents(category, theme, session, choice),
  onSuccess: (data) => {
   if (data.success === true) {
    saveResults(
     category,
     theme,
     session,
     window.localStorage.getItem("token")
      ? jwt_decode(window.localStorage.getItem("token"))._id
      : null
    );
    router.push(`/${category}/${theme}/${session}/result`);
   } else {
    curr.refetch();
   }
  },
 });

 const nextClickHandler = async (choice) => {
  nextMutation.mutate({ category, theme, session, choice });
 };

 if (curr.isFetching) return <div>Loading...</div>;
 if (curr.data.current[0].finished === true) return <div>Game finished.</div>;
 return (
  <div className="overflow-hidden h-screen dark:bg-slate-800 dark:text-slate-50">
   <>
    <div className="mt-5 text-3xl text-center">{theme}</div>
    <div className="mt-1 mb-3 text-3xl text-center">
     Round: {curr.data.current[2].round}/{curr.data.current[2].total - 1}
    </div>
    <div className="w-full flex h-screen">
     <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
      <Image
       loader={() => curr.data.current[0].imgUrl}
       src={curr.data.current[0].imgUrl}
       alt="Choice1"
       width={200}
       height={500}
       className="w-full h-full object-cover blur-md"
      />
      <Image
       loader={() => curr.data.current[0].imgUrl}
       onClick={() => nextClickHandler(curr.data.current[0])}
       src={curr.data.current[0].imgUrl}
       alt="Choice1"
       width={200}
       height={500}
       className={`absolute cursor-pointer bg-transparent w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-contain top-[160px] md:top-[220px] md:left-[calc(80px+(100%-80px)/4)] left-1/2 translate-x-[-50%] shadow-2xl hover:-rotate-3 ease-in-out duration-300`}
      />
     </div>
     <div className="w-full md:w-1/2 h-[300px] md:h-[600px]">
      <Image
       loader={() => curr.data.current[1].imgUrl}
       src={curr.data.current[1].imgUrl}
       alt="Choice1"
       width={200}
       height={500}
       className="w-full h-full object-cover blur-md"
      />
      <Image
       loader={() => curr.data.current[1].imgUrl}
       onClick={() => nextClickHandler(curr.data.current[1])}
       src={curr.data.current[1].imgUrl}
       placeholder="blur"
       blurDataURL={curr.data.current[1].imgUrl}
       alt="Choice1"
       width={200}
       height={500}
       className={`absolute cursor-pointer w-[350px] h-[200px] md:w-[650px] md:h-[380px] object-contain right-1/2 md:right-[calc((100%-80px)/4)] top-[470px] md:top-[220px] translate-x-[50%] shadow-2xl hover:rotate-3 ease-in-out duration-300`}
      />
     </div>
    </div>
   </>
  </div>
 );
};

export default Game;
