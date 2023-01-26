import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

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

 return (
  <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
   <Component {...pageProps} />
  </Layout>
 );
}

export default MyApp;
