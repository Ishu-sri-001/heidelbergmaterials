import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PlayHoverSound, useBackgroundAudio } from "../Audio/SFX";

gsap.registerPlugin(MotionPathPlugin);

export default function IntroBox({
  setCameraPos,
  setCameraRotation,
  ActiveProperties,
  SetActiveProperties,
  setShowIntroBox,
  setShowSidebar,
  playSound,
  setPlaySound,
}) {
 

  const { PlaySoundBackground } = useBackgroundAudio();
  const { playSoundHover } = PlayHoverSound();

  useEffect(() => {
    gsap.to("#greenPath", {
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      motionPath: {
        path: "#circlePath",
        align: "#circlePath",
        alignOrigin: [-0.4, 0.7],
        autoRotate: true,
        start: -0.2,
        end: 0.08,
      },
    });
  }, []);
  const handleEnter = () => {
    const tl = gsap.timeline();
    tl.to(".enter-container", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowIntroBox(false);
        setShowSidebar(true);
        document.querySelector(".enter-container").style.display = "none";
        //   SetActiveProperties(prev =>
        //   prev.map((item, i) =>
        //     i === 0
        //       ? { ...item, repeal: true, dispersion: false } // Earth: repel ON, dispersion OFF
        //       : { ...item, dispersion: true } // Others: disperse
        //   )
        // );
      },
    });

    const position = { x: 0, y: -0.1, z: 2.3 };
    const rotationProxy = { x: 0, y: 0, z: 0 };
    tl.to(position, {
      z: 0.6,
      y: 0,
      x: -0.5,
      duration: 1,
      onUpdate: () => {
        setCameraPos({ ...position });
      },
    });
    tl.to(
      rotationProxy,
      {
        x: -90,
        duration: 1,
        onUpdate: () => {
          setCameraRotation({ ...rotationProxy });
        },
        onComplete: () => {
          SetActiveProperties([
            {
              name: "Earth",
              repeal: true,
              dispersion: false,
              animate: false,
            },
            ...ActiveProperties.slice(1),
          ]);
        },
      },
      "<"
    );
    tl.to(
      rotationProxy,
      {
        x: -90,
        z: 45,
        duration: 1,
        onUpdate: () => {
          setCameraRotation({ ...rotationProxy });
        },
      },
      "<"
    );
    PlaySoundBackground(setPlaySound((prev)=>!prev));
  };

  return (
    <>
      <div className="p-[1vw] enter-container bg-white absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] h-fit w-[27vw] rounded-bl-[5vw] ">
        <div className="h-full flex flex-col items-center justify-center text-center gap-[.5vw]   w-full pb-[2vw]  text-green-800 border-zinc-200 border rounded-bl-[5vw]">
          <div className="h-[10vw] mb-[2vw]  flex border-b border-zinc-200 w-full ">
            <div className="w-1/2 flex items-center justify-center h-full border-r border-zinc-200">
              <svg
                className="w-2/3 h-full object-contain"
                viewBox="0 0 204 180"
                width="204"
                height="180"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="__lottie_element_2">
                    <rect width="204" height="180" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_2)">
                  <g
                    style={{ display: "block" }}
                    transform="matrix(0.11039339751005173,0.9938879609107971,-0.9938879609107971,0.11039339751005173,114.32548522949219,123.31190490722656)"
                    opacity="1"
                  >
                    <g
                      opacity="1"
                      transform="matrix(1.9746062755584717,-0.317694753408432,0.317694753408432,1.9746062755584717,0,0)"
                    >
                      <path
                        id="greenPath"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        fillOpacity="0"
                        stroke="rgb(0,221,57)"
                        strokeOpacity="1"
                        strokeWidth="3.9"
                        d="M-4.033999919891357,4.033999919891357 C-2.259999990463257,3.3259999752044678 -0.6340000033378601,2.25 0.7509999871253967,0.8650000095367432 C2.135999917984009,-0.5199999809265137 3.252000093460083,-2.184999942779541 4.033999919891357,-4.033999919891357"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: "block" }}
                    transform="matrix(1,0,0,1,85.8949966430664,84.33200073242188)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M-1.684000015258789,2.3499999046325684 C-1.684000015258789,2.3499999046325684 1.684000015258789,-2.3499999046325684 1.684000015258789,-2.3499999046325684"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: "block" }}
                    transform="matrix(1,0,0,1,105.552001953125,77.66899871826172)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M3.7060000896453857,5.209000110626221 C3.7060000896453857,5.209000110626221 -3.7060000896453857,-5.209000110626221 -3.7060000896453857,-5.209000110626221"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,71.80699920654297,104.5459976196289)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M0,9.904000282287598 C5.46999979019165,9.904000282287598 9.904000282287598,5.46999979019165 9.904000282287598,0 C9.904000282287598,-5.46999979019165 5.46999979019165,-9.904000282287598 0,-9.904000282287598 C-5.46999979019165,-9.904000282287598 -9.904000282287598,-5.46999979019165 -9.904000282287598,0 C-9.904000282287598,5.46999979019165 -5.46999979019165,9.904000282287598 0,9.904000282287598z"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: "block" }}
                    transform="matrix(1,0,0,1,97.95700073242188,67.43000030517578)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M0,7.715000152587891 C4.261000156402588,7.715000152587891 7.715000152587891,4.261000156402588 7.715000152587891,0 C7.715000152587891,-4.261000156402588 4.261000156402588,-7.715000152587891 0,-7.715000152587891 C-4.261000156402588,-7.715000152587891 -7.715000152587891,-4.261000156402588 -7.715000152587891,0 C-7.715000152587891,4.261000156402588 -4.261000156402588,7.715000152587891 0,7.715000152587891z"
                      ></path>
                    </g>
                  </g>
                  <g
                    style={{ display: "block" }}
                    transform="matrix(1,0,0,1,124.44499969482422,104.5459976196289)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        strokeLinecap="butt"
                        id="circlePath"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M0,9.904000282287598 C5.46999979019165,9.904000282287598 9.904000282287598,5.46999979019165 9.904000282287598,0 C9.904000282287598,-5.46999979019165 5.46999979019165,-9.904000282287598 0,-9.904000282287598 C-5.46999979019165,-9.904000282287598 -9.904000282287598,-5.46999979019165 -9.904000282287598,0 C-9.904000282287598,5.46999979019165 -5.46999979019165,9.904000282287598 0,9.904000282287598z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="w-1/2 flex items-center justify-center h-full">
              <Image
                src="/assets/svg/hand.svg"
                width={100}
                height={100}
                className="w-[7vw] h-[7vw] opacity-50"
                alt=""
              />
            </div>
          </div>
          <p className="font-black text-[1.1vw] font-body tracking-tight w-full text-green-800">
            {" "}
            Our CCUS mission
          </p>
          <p className="w-[90%] text-[1.1vw] pt-[1vw] font-normal font-display tracking-tight leading-[1.1]">
            At Heidelberg Materials we are taking the lead in decarbonising our
            sector. We are pioneering Carbon Capture, Utilisation and Storage,
            laying the foundation for scaling CCUS across our global operations.
          </p>
          <div
            onClick={handleEnter}
            onMouseEnter={playSoundHover}
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
            <p className="text-[.9vw] pr-[1.2vw] text-zinc-700 font-display">
              Next
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
}
