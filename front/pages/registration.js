import {useState} from 'react'
import Link from "next/link";

const regisration = () => {
  return (
    <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 w-full h-full overflow-hidden">
   <div className="flex flex-col px-10 w-11/12 md:w-1/3 left-[50%] top-[50%] absolute bg-slate-100 translate-y-[-50%] items-center translate-x-[-50%] text-xl rounded-xl">
    <div className="my-5 text-2xl">Register</div>
    <form>
     <input
      type="text"
      placeholder="Your email..."
      className={`bg-slate-100 w-full border-b-2 ${
       Boolean(true) ? "text-red-600" : "text-blue-600"
      } ${
       Boolean(true)
        ? "border-red-600"
        : "border-violet-400"
      } my-5 outline-none focus:border-blue-600`}
     ></input>
     <input
      type="text"
      placeholder="Nickname..."
      className={`bg-slate-100 w-full border-b-2 ${
       Boolean(true) ? "text-red-600" : "text-blue-600"
      } ${
       Boolean(true)
        ? "border-red-600"
        : "border-violet-400"
      } my-5 outline-none focus:border-blue-600`}
     ></input>
     <input
      type="password"
      placeholder="Password..."
      className={`bg-slate-100 w-full border-b-2 ${
       Boolean(true) ? "text-red-600" : "text-blue-600"
      } ${
       Boolean(true)
        ? "border-red-600"
        : "border-violet-400"
      } my-5 outline-none focus:border-blue-800`}
     ></input>
     <input
      type="text"
      placeholder="Avatar URL..."
      className={`bg-slate-100 w-full border-b-2 ${
       Boolean(true) ? "text-red-600" : "text-blue-600"
      } ${
       Boolean(true)
        ? "border-red-600"
        : "border-violet-400"
      } my-5 outline-none focus:border-blue-600`}
     ></input>
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