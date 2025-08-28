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
        onClick={handleOpenButton}
        onMouseEnter={playSoundHover}
        className={`hover:scale-105 duration-500 transition-all rounded-tr-[1.5vw] cursor-pointer rounded-bl-[1.5vw] p-[1.5vw] z-[100] absolute top-[1vw] right-[1vw] bg-teal-600/20 backdrop-blur-[10px] flex items-center gap-[.8vw] border-white/40 border ${
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
        <p className="text-white text-[.8vw] tracking-wide">All Topics</p>
      </div>

      <div className="w-full z-[599] pointer-events-none duration-500 transition-all overloadAllTopic h-screen bg-green-400/10 opacity-0 backdrop-blur-[5px] fixed inset-0" />
      <div
        onClick={handleCloseButton}
        onMouseEnter={() => playSoundHover()}
        className="buttondiv hover:scale-110 duration-500 transition-all opacity-0 h-[4vw] cursor-pointer flex items-center justify-center rounded-tr-[1vw] rounded-bl-[1vw] w-[4vw] bottom-1/2 translate-y-[50%] bg-white fixed z-[600] left-1/2 translate-x-[0%]"
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
      <div className="z-[600] fixed sliderAllTopic translate-x-[115%] top-1/2 right-[.5vw] flex items-center justify-center bg-white h-[98%] translate-y-[-50%] w-[45vw] rounded-bl-[2vw]">
        <div className="w-[95%] slider flex flex-wrap overflow-hidden h-[96%] border border-zinc-100 rounded-bl-[2vw]">
          {subsectionData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => playSoundHover()}
              className="flex flex-col  group items-center justify-center border-zinc-100 gap-[1vw] overflow-hidden cursor-pointer relative z-[100] border w-[calc(100%/2)] h-[calc(100%/3)]"
            >
              <div className="h-full z-[10] group-hover:translate-y-[-100%] duration-700 transition-all group-hover:opacity-0 w-full flex items-center justify-center gap-[1vw] flex-col bg-white">
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
                <p className="z-[100] text-[.9vw] font-medium uppercase">
                  {item.title}
                </p>
              </div>
              <div className="w-full flex items-start justify-center flex-col h-full p-[1vw] bg-zinc-100 absolute inset-0 z-[1]">
                {item.subtopics.map((subtopic, subtopicIndex) => (
                  <p
                    onMouseEnter={playSoundHover}
                    onClick={() => handleInternalOpenButton(subtopicIndex)}
                    key={subtopicIndex}
                    className={`${
                      subtopicIndex !== item.subtopics.length - 1
                        ? "border-b"
                        : ""
                    } text-black/30 hover:text-zinc-900 duration-200 transition-all border-zinc-500 w-full`}
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
  console.log(subsectionData);
  return (
    <>
      <div
        onClick={handleCloseButton}
        onMouseEnter={() => playSoundHover()}
        className="hover:scale-110 duration-500 transition-all opacity-0 buttondivInternal h-[4vw] cursor-pointer flex items-center justify-center rounded-tr-[1vw] rounded-bl-[1vw] w-[4vw] bottom-1/2 translate-y-[50%] bg-white fixed z-[700] left-[15%] translate-x-[100%]"
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
        data-lenis-prevent
        className="z-[600] sliderAllTopicInternal fixed top-1/2 right-[.5vw] flex bg-white h-[98%] flex-col gap-[2vw] translate-x-[110%] py-[5vw] overflow-y-scroll translate-y-[-50%] w-[75vw] rounded-tr-[2vw] px-[4vw] rounded-bl-[2vw]"
      >
        <p className="text-green-800 pb-[3vw] w-full text-center font-bold text-[5vw] border-b border-zinc-200">
          {subsectionData[InternalData]?.title}
        </p>
        <div className="w-full h-[60vh] flex-shrink-0 rounded-[2vw] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={subsectionData[InternalData]?.subtopics[InternalData]?.image}
            alt={subsectionData[InternalData]?.title || "Topic Image"}
          />
        </div>
        <div className="py-[2vw] px-[2vw] flex items-center flex-col gap-[1vw]">
          <p className="font-semibold text-[2.5vw] uppercase text-left leading-[1] text-zinc-800">
            {subsectionData[InternalData]?.subtopics[InternalData]?.title}
          </p>
          <p className="text-[1vw]">
            {subsectionData[InternalData]?.subtopics[InternalData]?.description}
          </p>
        </div>
        <div className="w-full h-[40vh] flex-shrink-0 rounded-[2vw] bg-[#E6E6DF] flex items-center justify-center">
          <p className="font-semibold text-center text-[2vw] px-[10vw] leading-[1.25] text-zinc-800">
            {subsectionData[InternalData]?.subtopics[InternalData]?.details}
          </p>
        </div>
      </div>
    </>
  );
}
