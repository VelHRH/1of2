import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
 const [isAuth, setIsAuth] = useState();
 useEffect(() => {
  (async () => {
   try {
    const res = await fetch(`${process.env.API_HOST}/me`, {
     headers: {
      Authorization: `${window.localStorage.getItem("token")}`,
     },
    });
    const data = await res.json();
    data.message ? setIsAuth() : setIsAuth({ data: data });
    {
     window.localStorage.getItem("theme") &&
      document.body.classList.add("dark");
    }
   } catch (err) {
    console.log(err);
    setIsAuth();
   }
  })();
 }, []);

 const queryClient = useRef(new QueryClient());

 return (
  <QueryClientProvider client={queryClient.current}>
   <Hydrate state={pageProps.dehydratedState}>
    <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
     <Component {...pageProps} />
    </Layout>
   </Hydrate>
   <ReactQueryDevtools />
  </QueryClientProvider>
 );
}

export default MyApp;
