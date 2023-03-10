import { useEffect, useState } from "react";
import Head from "next/head";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";
import { AlertMessage } from "../../components/AlertMessage";
import Image from "next/image";
import { uploadImg } from "../../components/Fetch/uploadImg";
import { addTheme } from "../../components/Fetch/addTheme";
import { addEvents } from "../../components/Fetch/addEvents";

const Create = () => {
 const [name, setName] = useState("");
 const [thumbUrl, setThumbUrl] = useState("");
 const [description, setDescription] = useState("");
 const [creationStage, setCreationStage] = useState(1);
 const [pEvents, setPEvents] = useState([]);
 const [nEvents, setNEvents] = useState([""]);
 const [alert, setAlert] = useState("");

 const router = useRouter();
 const addImgHandler = async (e, i) => {
  if (e.target.files.length > 0) {
   const formData = new FormData();
   let p = pEvents;
   p[i] = e.target.files[0];
   setPEvents((prev) => [...prev, p[p.length]]);
   formData.append("image", e.target.files[0]);
   await uploadImg(formData);
  }
 };

 const submitHandler = async () => {
  try {
   const res = await addTheme(name, thumbUrl, description);
   if (res.message) {
    setAlert(res.message);
    return;
   }
   await addEvents(
    nEvents.slice(0, -1),
    name,
    pEvents.slice(0, -1).map((p) => p.name)
   );
   await router.push("/creations");
  } catch (err) {
   console.log(err);
  }
 };

 useEffect(() => {
  if (name.length > 2) {
   setCreationStage(2);
  }
  if (thumbUrl.length > 4) {
   setCreationStage(3);
  }
  if (description.length >= 10) {
   setCreationStage(4);
  }
  if (description.length < 10) {
   setCreationStage(3);
  }
  if (thumbUrl.length <= 4) {
   setCreationStage(2);
  }
  if (name.length < 3) {
   setCreationStage(1);
  }
 }, [name, thumbUrl, description]);

 useEffect(() => {
  if (nEvents[nEvents.length - 1].length > 0 && pEvents[nEvents.length - 1]) {
   setNEvents((prev) => [...prev, ""]);
  }
 }, [nEvents, pEvents]);

 return (
  <div className="w-full flex">
   <Head>
    <title>Create</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   {alert !== "" && <AlertMessage>{alert}</AlertMessage>}
   <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
    <h1 className="text-4xl mb-7 dark:text-slate-50">Create new theme</h1>
    <form>
     <div className="flex">
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-1/4">
       Name for your theme:
      </p>
      <Input
       inputValue={name}
       setInputValue={setName}
       placeholder="2+ symbols.."
      />
     </div>
     <div
      className={`${
       creationStage < 2 ? "opacity-0" : "opacity-100"
      } flex transition duration-700`}
     >
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-1/4">
       Url for your thumbnail:
      </p>
      <Input
       inputValue={thumbUrl}
       setInputValue={setThumbUrl}
       placeholder="4+ symbols.."
      />
     </div>
     <div
      className={`${
       creationStage < 3 ? "opacity-0" : "opacity-100"
      } flex transition duration-700`}
     >
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-1/4">
       Description for your theme:
      </p>
      <Input
       inputValue={description}
       setInputValue={setDescription}
       placeholder="10+ symbols.."
      />
     </div>
     <div
      className={`${
       creationStage < 4 ? "opacity-0" : "opacity-100"
      } flex flex-col transition duration-700`}
     >
      <p className="dark:text-slate-50 mr-5 text-xl py-2 w-full">
       Add elements to you theme (at least 8):
      </p>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-1">
       <div className="bg-slate-50 dark:bg-slate-800 p-2 grid grid-cols-2 gap-2">
        {nEvents.map((ev, i) => (
         <div
          key={i}
          className="flex p-2 bg-slate-200 dark:bg-slate-900 rounded-md"
         >
          {pEvents[i] !== undefined && pEvents[i].name !== undefined ? (
           <>
            <Image
             loader={() => {
              URL.createObjectURL(pEvents[i]);
             }}
             alt="New"
             src={URL.createObjectURL(pEvents[i])}
             width={32}
             height={32}
             className="w-[32px] aspect-square object-cover mr-2"
            />
           </>
          ) : (
           <>
            <label for="uploadImg" className="mr-2">
             <i class="fa-solid fa-download text-sky-500 text-2xl hover:scale-110 hover:text-sky-500 dark:hover:text-sky-500 duration-300 cursor-pointer"></i>
            </label>
            <input
             type="file"
             id="uploadImg"
             accept="image/*"
             className="hidden"
             onChange={(e) => addImgHandler(e, i)}
            />
           </>
          )}

          <input
           type="text"
           value={nEvents[i]}
           onChange={(e) => {
            let items = [...nEvents];
            items[i] = e.target.value;
            setNEvents(items);
           }}
           className="flex-1 bg-transparent p-1 border-b-2 border-sky-500 focus:outline-none dark:text-slate-50"
          />
         </div>
        ))}
       </div>
      </div>
     </div>
     {nEvents.length >= 2 && (
      <>
       <div className="text-center mt-10 dark:text-slate-50">
        Total: {nEvents.length - 1} items
       </div>
       <div
        onClick={() => submitHandler()}
        className="text-center py-2 text-2xl my-2 rounded-xl bg-gradient-to-r dark:text-slate-900 text-slate-50 from-cyan-500 to-blue-600 hover:scale-105 cursor-pointer ease-in-out duration-500"
       >
        Create theme
       </div>
      </>
     )}
    </form>
   </div>
   <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen p-10 flex flex-col items-center"></div>
  </div>
 );
};

export default Create;
