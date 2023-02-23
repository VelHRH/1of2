import { useRef, useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Input } from "../../components/Input";

const Create = () => {
 const [name, setName] = useState("");
 const [thumbUrl, setThumbUrl] = useState("");
 const [creationStage, setCreationStage] = useState(1);
 useEffect(() => {
  if (name.length > 2) {
   setCreationStage(2);
  }
  if (thumbUrl.length > 3) {
   setCreationStage(3);
  }
  if (thumbUrl.length < 7) {
   setCreationStage(2);
  }
  if (name.length < 3) {
   setCreationStage(1);
  }
 }, [name, thumbUrl]);

 return (
  <div className="w-full flex">
   <Head>
    <title>Create</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
    <h1 className="text-4xl mb-7 dark:text-slate-50">Create new theme</h1>
    <form className="">
     <div className="flex">
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-1/4">
       Name for your theme:
      </p>
      <Input inputValue={name} setInputValue={setName} />
     </div>
     <div
      className={`${
       creationStage < 2 ? "opacity-0" : "opacity-100"
      } flex transition duration-700`}
     >
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-1/4">
       Thumbnail for your theme:
      </p>
      <Input inputValue={thumbUrl} setInputValue={setThumbUrl} />
     </div>
     <div
      className={`${
       creationStage < 3 ? "opacity-0" : "opacity-100"
      } flex flex-col transition duration-700`}
     >
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-full">
       Add elements to you theme (at least 8):
      </p>
     </div>
    </form>
   </div>
   <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center"></div>
  </div>
 );
};

export default Create;
