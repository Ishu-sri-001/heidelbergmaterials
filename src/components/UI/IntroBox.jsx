import React from "react";
import gsap from "gsap";

export default function IntroBox({ setCameraPos }) {
  const handleEnter = () => {
    gsap.to(".enter-container", {
      opacity: 0,
      duration: 1,
    });
  };

  return (
    <div className="p-[1vw] enter-container bg-white absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] h-fit w-[27vw] rounded-bl-[5vw] ">
      <div className="h-full flex flex-col items-center justify-center text-center gap-[.5vw]   w-full pb-[2vw]  text-green-800 border-zinc-200 border rounded-bl-[5vw]">
        <div className="h-[10vw] mb-[2vw]  flex border-b border-zinc-200 w-full ">
          <div className="w-1/2 h-full border-r border-zinc-200"></div>
          <div className="w-1/2 h-full"></div>
        </div>
        <p className="font-black text-[1.1vw] tracking-tight w-full text-green-800">
          {" "}
          Our CCUS mission
        </p>
        <p className="w-[90%] text-[1vw] font-normal tracking-tight leading-[1.1]">
          At Heidelberg Materials we are taking the lead in decarbonising our
          sector. We are pioneering Carbon Capture, Utilisation and Storage,
          laying the foundation for scaling CCUS across our global operations.
        </p>
        <div
          onClick={handleEnter}
          className="flex items-center mt-[1.2vw] group cursor-pointer w-fit justify-center gap-[1vw] bg-[#E6E6DF] rounded-full p-[.3vw]"
        >
          <div className="bg-[#00DD39] group-hover:scale-105 duration-300 transition-all p-[1vw] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[1vw] h-[1vw]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
          <p className="text-[.8vw] pr-[1.2vw] text-zinc-700">Enter</p>
        </div>
      </div>
    </div>
  );
}
