import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [err, setErr] = useState("");
 const router = useRouter();

 const submit = async (e) => {
  e.preventDefault();
  const res = await fetch(`${process.env.API_HOST}/login`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    email,
    password,
   }),
  });
  const data = await res.json();

  if ("token" in data) {
   window.localStorage.setItem("token", data.token);
  } else {
   setErr(data.message);
   return;
  }
  await router.replace("/");
  router.reload();
 };
 return (
  <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 w-full h-full overflow-hidden">
   <div className="flex flex-col px-10 w-11/12 md:w-1/3 left-[50%] top-[50%] absolute bg-slate-100 translate-y-[-50%] items-center translate-x-[-50%] text-xl rounded-xl">
    <div className="my-5 text-2xl">Login</div>
    {err !== "" && <div className="text-lg text-red-600">{err}</div>}
    <form onSubmit={submit}>
     <input
      type="text"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      placeholder="Your email..."
      className={`bg-slate-100 w-full border-b-2 ${
       err !== "" && "text-red-600"
      } ${
       err !== "" ? "border-red-600" : "border-blue-400"
      } my-5 outline-none focus:border-blue-600`}
     ></input>
     <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      placeholder="Password..."
      className={`bg-slate-100 w-full border-b-2 ${
       err !== "" && "text-red-600"
      } ${
       err !== "" ? "border-red-600" : "border-blue-400"
      } my-5 outline-none focus:border-blue-600`}
     ></input>

     <button
      type="submit"
      className="bg-blue-600 text-slate-50 p-2 px-5 mt-5 my-3 w-full ease-in duration-200 text-center rounded-full cursor-pointer hover:bg-transparent hover:text-blue-600 border-2 border-blue-600"
     >
      Login
     </button>
    </form>
    <div className="mb-5 text-lg">
     Not registered yet?{" "}
     <Link href="/registration" className="underline">
      Do it now!
     </Link>
    </div>
   </div>
  </div>
 );
};

export default login;
