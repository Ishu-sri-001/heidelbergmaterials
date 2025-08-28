import React, { useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { subsectionData } from "@/app/Utils/data";
import PlayTickSound, { PlayHoverSound } from "../Audio/SFX";

export default function AllTopic() {
  const [hasOpened, setHasOpened] = useState(false);
  const [hasOpenedInternal, setHasOpenedInternal] = useState(false);
  const [InternalData, setInternalData] = useState(null);
  const { playSoundTick } = PlayTickSound();
  const { playSoundHover } = PlayHoverSound();

  const handleOpenButton = () => {
    if (hasOpened) return;
    playSoundTick();
    setHasOpened(true);
    const tl = gsap.timeline();
    tl.to(".sliderAllTopic", {
      x: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector(".overloadAllTopic").style.opacity = 1;
      },
    }).to(".buttondiv", {
      opacity: 1,
      duration: 1,
      delay: -1,
      ease: "power2.inOut",
    });
  };

  const handleCloseButton = () => {
    setHasOpened(false);
    playSoundTick();
    const tl = gsap.timeline();
    tl.to(".buttondiv", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
    tl.to(".sliderAllTopic", {
      x: "115%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector(".overloadAllTopic").style.opacity = 0;
      },
    });
  };

  const handleInternalOpenButton = (id) => {
    if (hasOpenedInternal) return;
    setInternalData(id);
    playSoundTick();

    setHasOpenedInternal(true);
    const tl = gsap.timeline();
    tl.to(".sliderAllTopicInternal", {
      x: 0,
      duration: 1,
      ease: "power2.inOut",
    });
    tl.to(".buttondivInternal", {
      opacity: 1,
      duration: 1,
      delay: -1,
      ease: "power2.inOut",
    });
  };

  const handleInternalCloseButton = () => {
    setHasOpenedInternal(false);
    playSoundTick();

    const tl = gsap.timeline();

    tl.to(".buttondivInternal", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
    tl.to(".sliderAllTopicInternal", {
      x: "115%",
      duration: 1,
      ease: "power2.inOut",
    });
    handleCloseButton();
  };

  return (
    <>
      <div
        data-hide-cursor
        onClick={handleOpenButton}
        onMouseEnter={playSoundHover}
        className={`hover:scale-105 duration-500 transition-all rounded-tr-[1.5vw] max-sm:rounded-tr-[8px] cursor-pointer rounded-bl-[1.5vw] max-sm:rounded-bl-[8px] p-[1.5vw] max-sm:p-3 z-[100] absolute top-[1vw] max-sm:top-4 right-[1vw] max-sm:right-4 maz bg-teal-600/20 backdrop-blur-[10px] flex items-center gap-[.8vw] max-sm:gap-2 border-white/40 border ${
          hasOpened ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1.75796"
              cy="6"
              r="1"
              transform="rotate(-45 1.75796 6)"
              fill="white"
            ></circle>
            <path
              d="M6.70628 1.05022C7.09681 1.44074 7.09681 2.07391 6.70628 2.46443C6.31576 2.85496 5.68259 2.85496 5.29207 2.46443C4.90154 2.07391 4.90154 1.44074 5.29207 1.05022C5.68259 0.659693 6.31576 0.659693 6.70628 1.05022Z"
              fill="white"
            ></path>
            <circle
              cx="5.9982"
              cy="10.2427"
              r="1"
              transform="rotate(-45 5.9982 10.2427)"
              fill="white"
            ></circle>
            <circle
              cx="10.2423"
              cy="6"
              r="1"
              transform="rotate(-45 10.2423 6)"
              fill="white"
            ></circle>
          </svg>
        </span>
        <p className="text-white text-[.8vw] max-sm:text-[12px] tracking-wide">All Topics</p>
      </div>

      <div
        data-hide-cursor
        className="w-full z-[599] pointer-events-none duration-500 transition-all overloadAllTopic h-screen bg-green-400/10 opacity-0 backdrop-blur-[5px] fixed inset-0"
      />
      <div
        data-hide-cursor
        onClick={handleCloseButton}
        onMouseEnter={() => playSoundHover()}
        className="buttondiv hover:scale-110 duration-500 transition-all opacity-0 h-[4vw] max-sm:h-[40px] cursor-pointer flex items-center justify-center rounded-tr-[1vw] max-sm:rounded-tr-[8px] rounded-bl-[1vw] max-sm:rounded-bl-[8px] w-[4vw] max-sm:w-[40px] bottom-1/2 translate-y-[50%] bg-white max-sm:z-[999] max-sm:top-0 max-sm:left-[10vw] fixed z-[600] left-1/2 translate-x-[0%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[20%] max-sm:w-full max-sm:h-full h-[20%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        data-hide-cursor
        className="z-[600] fixed sliderAllTopic translate-x-[115%] top-1/2 right-[.5vw] max-sm:right-2 flex items-center justify-center bg-white h-[98%] translate-y-[-50%] w-[45vw] max-sm:w-[90vw] rounded-bl-[2vw] max-sm:rounded-bl-[16px]"
      >
        <div className="w-[95%] slider flex flex-wrap overflow-hidden h-[96%] border border-zinc-100 rounded-bl-[2vw] max-sm:rounded-bl-[16px]">
          {subsectionData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => playSoundHover()}
              className="flex flex-col group items-center justify-center border-zinc-100 gap-[1vw] max-sm:gap-3 overflow-hidden cursor-pointer relative z-[100] border w-[calc(100%/2)] h-[calc(100%/3)]"
            >
              <div className="h-full z-[10] group-hover:translate-y-[-100%] duration-700 transition-all group-hover:opacity-0 w-full flex items-center justify-center gap-[1vw] max-sm:gap-3 flex-col bg-white">
                <div
                  key={item.icon}
                  className="w-[50%] z-[100] flex items-center justify-center h-[50%]"
                >
                  <Image
                    src={`./assets/svg/${item.icon}.svg`}
                    height={200}
                    width={200}
                    className="w-[100%] h-[100%] object-contain"
                    alt={item.title}
                  />
                </div>
                <p className="z-[100] text-[.9vw] max-sm:text-[14px] font-medium uppercase">
                  {item.title}
                </p>
              </div>
              <div className="w-full flex items-start justify-center flex-col h-full p-[1vw] max-sm:p-4 bg-zinc-100 absolute inset-0 z-[1]">
                {item.subtopics.map((subtopic, subtopicIndex) => (
                  <p
                    onMouseEnter={playSoundHover}
                    onClick={() => handleInternalOpenButton(subtopicIndex)}
                    key={subtopicIndex}
                    className={`${
                      subtopicIndex !== item.subtopics.length - 1
                        ? "border-b"
                        : ""
                    } text-black/30 hover:text-zinc-900 duration-200 transition-all border-zinc-500 w-full max-sm:text-[14px]`}
                  >
                    {subtopic.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <MenuSubSection
        InternalData={InternalData}
        subsectionData={subsectionData}
        handleCloseButton={handleInternalCloseButton}
      />
    </>
  );
}

function MenuSubSection({ handleCloseButton, InternalData, subsectionData }) {
  return (
    <>
      <div
        data-hide-cursor
        onClick={handleCloseButton}
        onMouseEnter={() => playSoundHover()}
        className="hover:scale-110 duration-500 transition-all opacity-0 buttondivInternal h-[4vw] max-sm:h-[40px] cursor-pointer flex items-center justify-center rounded-tr-[1vw] max-sm:rounded-tr-[8px] rounded-bl-[1vw] max-sm:rounded-bl-[8px] w-[4vw] max-sm:w-[40px] bottom-1/2 translate-y-[50%] bg-white fixed z-[700] left-[15%] translate-x-[100%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[20%] h-[20%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        data-hide-cursor
        data-lenis-prevent
        className="z-[600] sliderAllTopicInternal fixed top-1/2 right-[.5vw] max-sm:right-2 flex bg-white h-[98%] flex-col gap-[2vw] max-sm:gap-6 translate-x-[110%] py-[5vw] max-sm:py-8 overflow-y-scroll translate-y-[-50%] w-[75vw] max-sm:w-[90vw] rounded-tr-[2vw] max-sm:rounded-tr-[16px] px-[4vw] max-sm:px-6 rounded-bl-[2vw] max-sm:rounded-bl-[16px]"
      >
        <p className="text-green-800 pb-[3vw] max-sm:pb-6 w-full text-center font-bold text-[5vw] max-sm:text-[32px] border-b border-zinc-200">
          {subsectionData[InternalData]?.title}
        </p>
        <div className="w-full h-[60vh] max-sm:h-[300px] flex-shrink-0 rounded-[2vw] max-sm:rounded-[16px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={subsectionData[InternalData]?.subtopics[InternalData]?.image}
            alt={subsectionData[InternalData]?.title || "Topic Image"}
          />
        </div>
        <div className="py-[2vw] max-sm:py-4 px-[2vw] max-sm:px-4 flex items-center flex-col gap-[1vw] max-sm:gap-3">
          <p className="font-semibold text-[2.5vw] max-sm:text-[24px] uppercase text-left leading-[1] text-zinc-800">
            {subsectionData[InternalData]?.subtopics[InternalData]?.title}
          </p>
          <p className="text-[1vw] max-sm:text-[14px]">
            {subsectionData[InternalData]?.subtopics[InternalData]?.description}
          </p>
        </div>
        <div className="w-full h-[40vh] max-sm:h-[200px] flex-shrink-0 rounded-[2vw] max-sm:rounded-[16px] bg-[#E6E6DF] flex items-center justify-center">
          <p className="font-semibold text-center text-[2vw] max-sm:text-[18px] px-[10vw] max-sm:px-6 leading-[1.25] text-zinc-800">
            {subsectionData[InternalData]?.subtopics[InternalData]?.details}
          </p>
        </div>
      </div>
    </>
  );
}
