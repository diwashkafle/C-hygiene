import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingCoverPageSection = ({isAdmin}: {isAdmin: boolean}) => {
  return (
    <main className="relative w-full h-70 sm:h-160 sm:aspect-video">
      <Image
        src={"/cover.png"}
        alt="Hero Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(50%)",
        }}
        priority
      />
      <section className="text-white absolute left-3  sm:left-10 top-[12%] sm:top-[15%] flex flex-col space-y-5 text-3xl sm:text-7xl md:text-8xl font-bold">
        <h1>जैविक उत्पादन</h1>
        <h1>प्रकृतिले दिएको,</h1>
        <h1> हामीले जोगाएको</h1>
         <div className="flex space-x-2 sm:space-x-10">
          <Link className='' href={"/C-organic"}>
            <button className=' text-white  bg-green-700 text-base sm:text-2xl font-semibold cursor-pointer
             px-2 py-2 sm:px-4 sm:py-3 rounded-md'>
            जैविक उत्पादनहरू
            </button>
            </Link>
            {isAdmin && <Link className='' href={"/admin/dashboard"}>
            <button className=' text-white  bg-green-700 text-base sm:text-2xl font-semibold cursor-pointer
             px-2 py-2 sm:px-4 sm:py-3 rounded-md'>
            प्रशासक ड्यासबोर्ड
            </button>
            </Link>}
         </div>
      </section>
          </main>
  );
};

export default LandingCoverPageSection;
