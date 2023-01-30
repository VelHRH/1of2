import { useState, useEffect } from "react";
import { BackBtn } from "../../../components/BackBtn";
import Link from "next/link";
import Head from "next/head";
import ChartRatings from "../../../components/ChartRatings";
import { RatingElement } from "../../../components/RatingElement";
import { FullEvenView } from "../../../components/FullEvenView";
import { useRouter } from "next/router";
import {
 useQuery,
 QueryClient,
 dehydrate,
 useInfiniteQuery,
} from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const getTheme = async (category, theme) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}`
 );
 return res.json();
};

const getRating = async (category, theme, page) => {
 const res = await fetch(
  `${process.env.API_HOST}/categories/${category}/${theme}/rating`
 );
 const data = await res.json();
 return {
  data: data.slice(8 * page, 8 * (page + 1)),
  nextPage:
   (data.length - (data.length % 8)) / 8 + 1 > page + 1 ? page + 1 : undefined,
 };
};

export const getServerSideProps = async (context) => {
 const { category, theme } = context.params;
 const queryClient = new QueryClient();

 await queryClient.prefetchQuery(["category", category, theme], () =>
  getTheme(category, theme)
 );

 const data = await getTheme(category, theme);

 if (data.length === 0) {
  return {
   notFound: true,
  };
 }
 return {
  props: { dehydratedState: dehydrate(queryClient) },
 };
};

const Rating = () => {
 const router = useRouter();
 const { category, theme } = router.query;

 const { data, fetchNextPage, hasNextPage, isLoading, isError } =
  useInfiniteQuery(
   "rating",
   ({ pageParam = 0 }) => {
    console.log(pageParam);
    return getRating(category, theme, pageParam);
   },
   { getNextPageParam: (lastPage) => lastPage.nextPage }
  );

 const themeData = useQuery(["category", category, theme], () =>
  getTheme(category, theme)
 );

 const [isEventOpened, setIsEventOpened] = useState(-1);
 const [items, setItems] = useState([]);
 const [curPage, setCurPage] = useState(1);
 const [fetching, setFetching] = useState(false);

 if (isLoading) return <div>Loading...</div>;
 if (isError) console.log("ERROR");

 if (themeData.isLoading) return <div>Loading...</div>;

 const handleClick = (index) => {
  setIsEventOpened(index);
 };

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

 return (
  <>
   <Head>
    <title>Rating</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <div className="w-full flex">
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
     <Link href={`/${themeData.data[0].category}/${themeData.data[0].name}`}>
      <BackBtn>{themeData.data[0].name}</BackBtn>
     </Link>
     <div className="flex justify-between w-full">
      <h1 className="text-4xl mb-7 dark:text-slate-50 capitalize">Rating</h1>
     </div>
     <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage}
      dataLength={data.pages[0].data.length * data.pages.length}
     >
      {data.pages.map((pageData, i) =>
       pageData.data.map((event, index) => (
        <>
         <RatingElement
          key={event._id}
          index={index + 1 + i * 8}
          image={event.imgUrl}
          wins={event.wins}
          handleClick={handleClick}
         >
          {event.name}
         </RatingElement>
        </>
       ))
      )}
     </InfiniteScroll>
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
    </div>
   </div>
  </>
 );
};

export default Rating;
