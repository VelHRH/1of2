import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
 const [isAuth, setIsAuth] = useState();
 useEffect(() => {
  (async () => {
   try {
    const res = await fetch("http://localhost:4444/me", {
     headers: {
      Authorization: `${window.localStorage.getItem("token")}`,
     },
    });
    const data = await res.json();
    data.message ? setIsAuth() : setIsAuth(data.imgUrl);
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
