import { useEffect, useState } from "react";
import { BackBtn } from "../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import ChartRatings from "../../../components/Chart/ChartRatings";
import { StarRating } from "../../../components/Theme/StarRating";
import { FullEvenView } from "../../../components/FullEvenView";
import { useQuery, QueryClient, dehydrate, useMutation } from "react-query";
import { useRouter } from "next/router";
import { CommentSection } from "../../../components/Comment/CommentSection";
import { Comment } from "../../../components/Comment/Comment";
import { AlertMessage } from "../../../components/AlertMessage";
import { ThemePanel } from "../../../components/ThemePanel";
import { FunTip } from "../../../components/FunTip";
import { getTheme } from "../../../components/Fetch/getTheme";
import { getUser } from "../../../components/Fetch/getUser";
import { editComment } from "../../../components/Fetch/comment/editComment";
import { deleteComment } from "../../../components/Fetch/comment/deleteComment";
import { getComments } from "../../../components/Fetch/comment/getComments";
import { postComment } from "../../../components/Fetch/comment/postComment";
import { likeCommentReq } from "../../../components/Fetch/comment/likeCommentReq";
import { disCommentReq } from "../../../components/Fetch/comment/disCommentReq";
import { DataRatings } from "../../../components/Chart/DataRatings";
import { postGame } from "../../../components/Fetch/postGame";
import { getRating } from "../../../components/Fetch/getRating";
import { giveStar } from "../../../components/Fetch/giveStar";
import { changeFav } from "../../../components/Fetch/changeFav";

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

 const [alert, setAlert] = useState("");
 const [clickedMode, setClickedMode] = useState("8");
 const [isRating, setIsRating] = useState(false);
 const [isEventOpened, setIsEventOpened] = useState(-1);

 const themeData = useQuery(["category", category, theme], () =>
  getTheme(category, theme)
 );
 const ratingData = useQuery(["category", category, theme, "rating"], () =>
  getRating(category, theme)
 );
 const comments = useQuery(["comments", category, theme], () =>
  getComments(category, theme)
 );

 const me = useQuery("me", () =>
  getUser(`${window.localStorage.getItem("token")}`)
 );

 const startGame = useMutation({
  mutationFn: ({ category, theme, user, clickedMode }) =>
   postGame(category, theme, user, clickedMode),
  onSuccess: (data) => {
   router.push(`/${category}/${theme}/${data._id}`);
  },
 });

 const starMutation = useMutation(async (req) => {
  await giveStar(req.category, req.theme, req.r);
  await themeData.refetch();
 });

 const changeFavMutation = useMutation(async (req) => {
  await changeFav(req.category, req.theme);
  await me.refetch();
 });

 const postCommentMutation = useMutation({
  mutationFn: ({ category, theme, text }) => postComment(category, theme, text),
  onSuccess: (data) => {
   if (data.message === "You can post up to 2 comments under a theme") {
    setAlert(data.message);
    setTimeout(() => setAlert(""), 5000);
   }
   comments.refetch();
  },
 });

 const likeMutation = useMutation(async (req) => {
  await likeCommentReq(req.category, req.theme, req.id);
  await comments.refetch();
 });

 const disMutation = useMutation(async (req) => {
  await disCommentReq(req.category, req.theme, req.id);
  await comments.refetch();
 });

 const editMutation = useMutation(async (req) => {
  await editComment(req.category, req.theme, req.id, req.text);
  await comments.refetch();
 });

 const deleteMutation = useMutation(async (req) => {
  await deleteComment(req.category, req.theme, req.id);
  await comments.refetch();
 });

 const startClickHandler = async (user) => {
  startGame.mutate({ category, theme, user, clickedMode });
 };

 const starClickHandler = async (r) => {
  starMutation.mutate({ category, theme, r });
 };

 const submitCommentHandler = async (text) => {
  postCommentMutation.mutate({ category, theme, text });
 };

 const favHandler = async () => {
  changeFavMutation.mutate({ category, theme });
 };

 const likeComment = async (id) => {
  likeMutation.mutate({ category, theme, id });
 };

 const disComment = async (id) => {
  disMutation.mutate({ category, theme, id });
 };
 const edComment = async (id, text) => {
  editMutation.mutate({ category, theme, id, text });
 };

 const delComment = async (id) => {
  deleteMutation.mutate({ category, theme, id });
 };

 useEffect(() => {
  window.localStorage.getItem("token") && setIsRating(true);
 }, []);

 if (themeData.isLoading || me.isLoading) return <div>Loading...</div>;

 return (
  <>
   <Head>
    <title>{themeData.data[0].name}</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
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
    {alert !== "" && <AlertMessage>{alert}</AlertMessage>}
    <div className="w-full flex">
     <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
      <Link href={`/${themeData.data[0].category}`}>
       <BackBtn>{themeData.data[0].category}</BackBtn>
      </Link>
      <div className="flex justify-between w-full items-center mb-7">
       <h1 className="text-4xl dark:text-slate-50 capitalize w-[70%]">
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
      <ThemePanel
       setClickedMode={setClickedMode}
       maxElements={ratingData.data.length}
       startClickHandler={startClickHandler}
       ratingLink={`/${themeData.data[0].category}/${themeData.data[0].name}/rating`}
       clickedMode={clickedMode}
      />
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
        edComment={edComment}
        delComment={delComment}
       >
        {comment.text}
       </Comment>
      ))}
     </div>
     <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center">
      {me.data.message !== "No access" ? (
       me.data.favourite.includes(themeData.data[0].name) ? (
        <button
         onClick={() => favHandler()}
         className="text-center py-4 text-2xl mb-10 w-full rounded-xl bg-slate-200 dark:bg-slate-700 text-sky-500 hover:scale-110 cursor-pointer ease-in-out duration-500"
        >
         <i class="fa-solid fa-heart mr-2"></i>
         Remove
        </button>
       ) : (
        <button
         onClick={() => favHandler()}
         className="text-center py-4 text-2xl mb-10 w-full rounded-xl bg-gradient-to-r dark:text-slate-900 text-slate-50 from-cyan-500 to-blue-600 hover:scale-110 cursor-pointer ease-in-out duration-500"
        >
         <i class="fa-solid fa-heart mr-2"></i>
         Add
        </button>
       )
      ) : null}
      <h1 className="text-3xl mb-5 dark:text-slate-50">
       Community: {DataRatings(themeData.data[0].stars)[0].avg.toFixed(2)}
      </h1>
      <ChartRatings data={DataRatings(themeData.data[0].stars).slice(1)} />
      <div className="text-xl dark:text-slate-50 mt-5 mb-14">
       Based on {themeData.data[0].stars.length} votes
      </div>
      <FunTip tipText={themeData.data[0].description}></FunTip>
      <h1 className="text-3xl mb-5 mt-10 dark:text-slate-50">
       Top in this theme:
      </h1>
      {ratingData.data.length > 1 &&
       ratingData.data.slice(0, 2).map((r, index) => (
        <div key={index} className="h-[100px] w-full mb-3">
         <div className="w-full h-full flex justify-between items-center text-2xl">
          <Image
           loader={() => r.imgUrl}
           onClick={() => setIsEventOpened(index)}
           src={r.imgUrl}
           width={100}
           height={100}
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
  </>
 );
};

export default Theme;
