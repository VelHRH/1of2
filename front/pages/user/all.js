import Head from "next/head";
import { Search } from "../../components/Search";
import { useState } from "react";
import { ProfileCard } from "../../components/ProfileCard";

export default function AllUsers() {
 const [searchVal, setSearchVal] = useState();
 return (
  <div className="w-full flex">
   <Head>
    <title>Community</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-800 p-10">
    <h1 className="text-4xl mb-7 dark:text-slate-50">Categories</h1>
    <Search searchVal={searchVal} setSearchVal={setSearchVal} />
    <div className="flex">
     <div className="w-1/3 flex flex-col mr-4">
      <ProfileCard rank="ruby">ccccccccccccccccccccccccc </ProfileCard>
      <ProfileCard rank="diamond">aaaaaaaaaa </ProfileCard>
      <ProfileCard rank="common"> aaaaaaaaaaaaaaaa</ProfileCard>
      <ProfileCard rank="ruby">ccccccccccccccccccccccccc </ProfileCard>
     </div>
     <div className="w-1/3 flex flex-col mr-4">
      <ProfileCard rank="diamond">aaaaaaaaaa </ProfileCard>
      <ProfileCard rank="ruby">ccccccccccccccccccccccccc </ProfileCard>
      <ProfileCard rank="gold">
       sssssssssssssssssss ssssssssssssssssss{" "}
      </ProfileCard>
      <ProfileCard rank="common"> aaaaaaaaaaaaaaaa</ProfileCard>
     </div>
     <div className="w-1/3 flex flex-col">
      <ProfileCard rank="diamond">aaaaaaaaaa </ProfileCard>
      <ProfileCard rank="common"> aaaaaaaaaaaaaaaa</ProfileCard>
      <ProfileCard rank="ruby">ccccccccccccccccccccccccc </ProfileCard>
     </div>
    </div>
   </div>
   <div className="w-[25%] bg-slate-100 dark:bg-slate-900 min-h-screen"></div>
  </div>
 );
}
