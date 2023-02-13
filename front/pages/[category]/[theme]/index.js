import { useEffect, useState } from "react";
import { NumberBtn } from "../../../components/NumberBtn";
import { BackBtn } from "../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import ChartRatings from "../../../components/ChartRatings";
import { StarRating } from "../../../components/Theme/StarRating";
import { FullEvenView } from "../../../components/FullEvenView";
import { useQuery, QueryClient, dehydrate, useMutation } from "react-query";
import { useRouter } from "next/router";
import { CommentSection } from "../../../components/Comment/CommentSection";
import { Comment } from "../../../components/Comment/Comment";

const getTheme = async (category, theme) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}`
 );
 return res.json();
};

const postGame = async (category, theme, user, clickedMode) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/results`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   body: JSON.stringify({
    clickedMode,
    user,
   }),
  }
 );
 return res.json();
};

const getRating = async (category, theme) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/rating`
 );
 return res.json();
};

const getComments = async (category, theme) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/allcomments`
 );
 return res.json();
};

const giveStar = async (category, theme, r) => {
 await fetch(`${process.env.API_HOST}/categories/${category}/${theme}`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
   Authorization: `${window.localStorage.getItem("token")}`,
  },
  body: JSON.stringify({
   stars: r,
  }),
 });
};

const postComment = async (category, theme, text) => {
 await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/comment`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    text,
   }),
  }
 );
};

const likeCommentReq = async (category, theme, id) => {
 await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/likecomment`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    id,
   }),
  }
 );
};

const disCommentReq = async (category, theme, id) => {
 await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/dislikecomment`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    id,
   }),
  }
 );
};

export const getServerSideProps = async (context) => {
 const { category, theme } = context.params;
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery(["category", category, theme], () =>
  getTheme(category, theme)
 );
 await queryClient.prefetchQuery(["category", category, theme, "rating"], () =>
  getRating(category, theme)
 );
 await queryClient.prefetchQuery(["comments", category, theme], () =>
  getComments(category, theme)
 );

 const data = await getTheme(category, theme);

 if (data.message) {
  return {
   notFound: true,
  };
 }
 return {
  props: { dehydratedState: dehydrate(queryClient) },
 };
};

const Theme = () => {
 const router = useRouter();
 const { category, theme } = router.query;

 const themeData = useQuery(["category", category, theme], () =>
  getTheme(category, theme)
 );
 const ratingData = useQuery(["category", category, theme, "rating"], () =>
  getRating(category, theme)
 );
 const comments = useQuery(["comments", category, theme], () =>
  getComments(category, theme)
 );

 const startGame = useMutation({
  mutationFn: ({ category, theme, user, clickedMode }) =>
   postGame(category, theme, user, clickedMode),
  onSuccess: (data) => {
   console.log(data);
   router.push(`/${category}/${theme}/${data._id}`);
  },
 });

 const starMutation = useMutation(async (req) => {
  await giveStar(req.category, req.theme, req.r);
  await themeData.refetch();
 });

 const postCommentMutation = useMutation(async (req) => {
  await postComment(req.category, req.theme, req.text);
  await comments.refetch();
 });

 const likeMutation = useMutation(async (req) => {
  await likeCommentReq(req.category, req.theme, req.id);
  await comments.refetch();
 });

 const disMutation = useMutation(async (req) => {
  await disCommentReq(req.category, req.theme, req.id);
  await comments.refetch();
 });

 const startClickHandler = async (user) => {
  const current = startGame.mutate({ category, theme, user, clickedMode });
 };

 const starClickHandler = async (r) => {
  starMutation.mutate({ category, theme, r });
 };

 const submitCommentHandler = async (text) => {
  postCommentMutation.mutate({ category, theme, text });
 };

 const likeComment = async (id) => {
  likeMutation.mutate({ category, theme, id });
 };

 const disComment = async (id) => {
  disMutation.mutate({ category, theme, id });
 };

 const [clickedMode, setClickedMode] = useState("8");
 const [isRating, setIsRating] = useState(false);
 const [isEventOpened, setIsEventOpened] = useState(-1);
 const [isGame, setIsGame] = useState("false");
 const handleModeChoice = (mode) => {
  setClickedMode(mode);
 };

 if (themeData.isLoading) return <div>Loading...</div>;

 const DataRatings = () => {
  let nOf5 = 0,
   nOf4 = 0,
   nOf3 = 0,
   nOf2 = 0,
   nOf1 = 0;
  for (let i of themeData.data[0].stars) {
   if (i.stars === 5) nOf5++;
   if (i.stars === 4) nOf4++;
   if (i.stars === 3) nOf3++;
   if (i.stars === 2) nOf2++;
   if (i.stars === 1) nOf1++;
  }
  return [
   {
    avg:
     (nOf5 * 5 + nOf4 * 4 + nOf3 * 3 + nOf2 * 2 + nOf1 * 1) /
     (nOf5 + nOf4 + nOf3 + nOf2 + nOf1),
   },
   nOf1 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf1 },
   nOf2 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf2 },
   nOf3 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf3 },
   nOf4 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf4 },
   nOf5 !== 0 && {
    value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf5,
   },
  ];
 };

 useEffect(() => {
  window.localStorage.getItem("token") && setIsRating(true);
 }, []);

 return (
  <>
   <Head>
    <title>{themeData.data[0].name}</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   {isGame == "true" ? (
    <Game clickedMode={clickedMode} setIsGame={setIsGame} />
   ) : isGame === "loading" ? (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-50">
     Loading...
    </div>
   ) : (
    <>
     {isEventOpened > -1 && (
      <FullEvenView
       setIsEventOpened={setIsEventOpened}
       link={ratingData.data[isEventOpened].imgUrl}
       name={ratingData.data[isEventOpened].name}
       wins={ratingData.data[isEventOpened].wins}
       likes={ratingData.data[isEventOpened].likes}
       dislikes={ratingData.data[isEventOpened].dislikes}
      />
     )}
     <div className="w-full flex">
      <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
       <Link href={`/${themeData.data[0].category}`}>
        <BackBtn>{themeData.data[0].category}</BackBtn>
       </Link>
       <div className="flex justify-between w-full">
        <h1 className="text-4xl mb-7 dark:text-slate-50 capitalize">
         {themeData.data[0].name}
        </h1>
        {isRating && (
         <StarRating
          starClickHandler={starClickHandler}
          rating={
           themeData.data[0].stars.find(
            (element) =>
             element.user ===
             jwt_decode(window.localStorage.getItem("token"))._id
           )?.stars || 0
          }
         />
        )}
       </div>
       <Image
        loader={() => themeData.data[0].imgUrl}
        src={themeData.data[0].imgUrl}
        alt="Subcategory"
        width={200}
        height={500}
        className="h-[350px] w-full object-cover"
       />
       <div className="grid gap-4 grid-cols-4 mt-5 w-full mb-10">
        <NumberBtn
         isClicked={clickedMode === "8"}
         handleModeChoice={handleModeChoice}
        >
         8
        </NumberBtn>
        <NumberBtn
         isClicked={clickedMode === "16"}
         handleModeChoice={handleModeChoice}
        >
         16
        </NumberBtn>
        <NumberBtn
         isClicked={clickedMode === "32"}
         handleModeChoice={handleModeChoice}
        >
         32
        </NumberBtn>
        <NumberBtn
         isClicked={clickedMode === "64"}
         handleModeChoice={handleModeChoice}
        >
         64
        </NumberBtn>
        <Link
         href={`/${themeData.data[0].category}/${themeData.data[0].name}/rating`}
         className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center"
        >
         <i className="fa-solid fa-trophy mr-2"></i>
         Rating
        </Link>
        <div className="text-xl md:text-2xl flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer rounded-2xl hover:scale-110 ease-in-out duration-500 items-center">
         <i className="fa-solid fa-share-nodes mr-2"></i>
         Share
        </div>

        <div
         onClick={() =>
          startClickHandler(
           window.localStorage.getItem("token")
            ? jwt_decode(window.localStorage.getItem("token"))._id
            : null
          )
         }
         className="text-xl md:text-2xl col-span-2 flex justify-center py-2 dark:text-slate-900 text-slate-50 bg-gradient-to-r from-lime-500 to-green-600 cursor-pointer rounded-2xl hover:scale-105 ease-in-out duration-500"
        >
         Start
        </div>
       </div>
       {isRating && (
        <CommentSection submitCommentHandler={submitCommentHandler} />
       )}
       {comments.data.map((comment) => (
        <Comment
         key={comment._id}
         id={comment._id}
         isLogged={isRating}
         likes={comment.likes}
         dislikes={comment.dislikes}
         user={comment.user}
         curUser={
          isRating && jwt_decode(window.localStorage.getItem("token"))._id
         }
         likeComment={likeComment}
         disComment={disComment}
        >
         {comment.text}
        </Comment>
       ))}
      </div>
      <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center">
       <h1 className="text-3xl mb-5 dark:text-slate-50">
        Community: {DataRatings()[0].avg.toFixed(2)}
       </h1>
       <ChartRatings data={DataRatings().slice(1)} />
       <div className="text-xl dark:text-slate-50 mt-5">
        Based on {themeData.data[0].stars.length} votes
       </div>
       <h1 className="text-3xl mb-5 mt-16 dark:text-slate-50">
        Top in this theme:
       </h1>
       {ratingData.data.length > 1 &&
        ratingData.data.slice(0, 2).map((r, index) => (
         <div key={index} className="h-[100px] w-full mb-3">
          <div className="w-full h-full flex justify-between items-center text-2xl">
           <img
            onClick={() => setIsEventOpened(index)}
            src={r.imgUrl}
            alt="Top"
            className="h-full aspect-square object-cover rounded-full cursor-pointer"
           />
           <h1 className="dark:text-slate-50">{r.wins} wins</h1>
          </div>
         </div>
        ))}
      </div>
     </div>
    </>
   )}
  </>
 );
};

export default Theme;
