import {useState} from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

const regisration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imgurl, setImgurl] = useState();
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.API_HOST}/register`, {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      email,
      login: name,
      password,
      imgUrl: imgurl || "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
     }),
    });
    const data = await res.json();
  
    if (!("token" in data)) {
     setErr(data.message || data[0].msg);
     return;
    }
    await router.replace("/login");
   };

  return (
    <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 w-full h-full overflow-hidden">
   <div className="flex flex-col px-10 w-11/12 md:w-1/3 left-[50%] top-[50%] absolute bg-slate-100 translate-y-[-50%] items-center translate-x-[-50%] text-xl rounded-xl">
    <div className="my-5 text-2xl">Register</div>
    <form onSubmit={submit}>
     <input
      type="text"
      placeholder="Your email..."
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className={`bg-slate-100 w-full border-b-2 ${
        err === "Invalid email" || err === "Unable to register" && "text-red-600" 
      } ${
        err === "Invalid email" || err === "Unable to register"
        ? "border-red-600"
        : "border-blue-400"
      } mt-5 mb-3 outline-none focus:border-blue-600`}
     ></input>
     {err === "Invalid email" && <div className='text-sm text-red-600'>{err}</div>}
     {err === "Unable to register" && <div className='text-sm text-red-600'>Unable to register this email</div>}
     <input
      type="text"
      placeholder="Nickname..."
      onChange={(e) => setName(e.target.value)}
      value={name}
      className={`bg-slate-100 w-full border-b-2 ${
        err === "At least 3 caracters in name" && "text-red-600" 
      } ${
        err === "At least 3 caracters in name"
        ? "border-red-600"
        : "border-blue-400"
      } mt-7 mb-3 outline-none focus:border-blue-600`}
     ></input>
     {err === "At least 3 caracters in name" && <div className='text-sm text-red-600'>{err}</div>}
     <input
      type="password"
      placeholder="Password..."
       onChange={(e) => setPassword(e.target.value)}
      value={password}
      className={`bg-slate-100 w-full border-b-2 ${
        err === "Password should be at least 8 symbols long" && "text-red-600" 
      } ${
        err === "Password should be at least 8 symbols long" 
        ? "border-red-600"
        : "border-blue-400"
      } mt-7 mb-3 outline-none focus:border-blue-600`}
     ></input>
     {err === "Password should be at least 8 symbols long" && <div className='text-sm text-red-600'>{err}</div>}
     <input
      type="text"
      placeholder="Avatar URL... (optional)"
      onChange={(e) => setImgurl(e.target.value)}
      value={imgurl}
      className={`bg-slate-100 w-full border-b-2 ${
        err === "Not an URL" && "text-red-600"
      } ${
        err === "Not an URL"
        ? "border-red-600"
        : "border-blue-400"
      } mt-7 mb-3 outline-none focus:border-blue-600`}
     ></input>
      {err === "Not an URL" && <div className='text-sm text-red-600'>{err}</div>}
     <button
      type="submit"
      className="bg-blue-600 text-slate-50 p-2 px-5 mt-5 mb-3 w-full ease-in duration-200 text-center rounded-full cursor-pointer hover:bg-transparent hover:text-blue-600 border-2 border-blue-600"
     >
      Register account
     </button>
    </form>
    <div className="mb-5 text-lg">
     Already registered?{" "}
     <Link href="/login" className="underline">
      Log in then!
     </Link>
    </div>
   </div>
  </div>
  )
}

export default regisration