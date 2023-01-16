import { Logo } from "./Logo";

export const Navbar = () => {
 return (
  <div className="flex flex-col items-center px-3 bg-slate-100 text-slate-400">
   <Logo />
   <div className="pt-7 border-t-2 border-slate-400 flex flex-col px-3 text-2xl cursor-pointer items-center">
    <i className="fa-solid fa-house pb-7"></i>
    <i class="fa-solid fa-briefcase pb-7"></i>
    <i class="fa-solid fa-user-group pb-7"></i>
   </div>
  </div>
 );
};
