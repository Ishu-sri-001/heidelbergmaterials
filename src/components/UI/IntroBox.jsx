import React, { useEffect, useState, useRef } from "react";
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

  const clickStep = useRef(0);

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

    if (clickStep.current === 0) {
      // Kill the initial animation
      gsap.killTweensOf("#greenPath");

      gsap.to("#hand-svg", {
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        yPercent: -20,
      });

      tl.to(".intro-text, .intro-heading", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
      });

      tl.fromTo(
        ".svg-left",
        {
          opacity: 1,
        },
        {
          opacity: 0.5,
          duration: 0.5,
        },
        "<"
      );
      tl.fromTo(
        ".svg-right",
        {
          opacity: 0.5,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );

      tl.add(() => {
        document.querySelector(".intro-heading").innerText =
          "Discover CCUS at Heidelberg Materials";
        document.querySelector(".intro-text").innerText =
          "Scroll to explore six zones representing our ground-breaking work in CCUS - each depicted by a different 3D object.";
      });

      tl.to(".intro-text, .intro-heading", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      });
      clickStep.current = 1;
    } else {
      const tl = gsap.timeline();

      tl.to(".enter-container", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setShowIntroBox(false);
          setShowSidebar(true);
          document.querySelector(".enter-container").style.display = "none";
            SetActiveProperties(prev =>
            prev.map((item, i) =>
              i === 0
                ? { ...item, repeal: true, dispersion: false }
                : { ...item, dispersion: false } 
            )
          );
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
              },
              ...ActiveProperties.slice(1),
            ]);
      // console.log(ActiveProperties)

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
      PlaySoundBackground(setPlaySound((prev) => !prev));
    }
  };

  return (
    <>
      <div className="p-[1vw] max-sm:p-4 enter-container bg-white h-fit absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] w-[27vw] max-sm:w-[90vw] rounded-bl-[5vw] max-sm:rounded-bl-[20px]">
        <div className="h-full flex flex-col items-center justify-center text-center gap-[.5vw] max-sm:gap-2 w-full pb-[2vw] max-sm:pb-4 text-green-800 border-zinc-200 border rounded-bl-[5vw] max-sm:rounded-bl-[20px]">
          <div className="h-[10vw] max-sm:h-[100px] min-h-[10vw] max-sm:min-h-[100px] flex border-b border-zinc-200 w-full">
            <div className="w-1/2 flex items-center justify-center h-full border-r border-zinc-200">
            <svg
                className="w-2/3 h-full object-contain svg-left"
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
            <div className="w-1/2 flex items-center justify-center h-full ">
              <svg
                className="w-1/3 h-full object-contain svg-right opacity-50 scale-[0.8]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 152 198"
                width="152"
                height="198"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "translate3d(0px, 0px, 0px)",
                  contentVisibility: "visible",
                }}
              >
                <defs>
                  <clipPath id="__lottie_element_22">
                    <rect width="152" height="198" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_22)">
                  <g
                    transform="matrix(1,0,0,1,73.85,78.73)"
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
                        d="M2.877,13.364C5.189,12.737 7.229,11.373 8.683,9.481C10.137,7.589 10.925,5.276 10.925,2.896C10.925,2.896 10.925,-6.134 10.925,-6.134C10.925,-8.052 10.158,-9.891 8.792,-11.247C7.426,-12.603 5.573,-13.364 3.642,-13.364C3.642,-13.364 -3.64,-13.364 -3.64,-13.364C-4.597,-13.364 -5.544,-13.178 -6.428,-12.815C-7.312,-12.452 -8.115,-11.918 -8.791,-11.247C-9.467,-10.576 -10.004,-9.778 -10.37,-8.901C-10.736,-8.024 -10.925,-7.084 -10.925,-6.134C-10.925,-6.134 -10.925,2.896 -10.925,2.896C-10.925,5.27 -10.14,7.578 -8.693,9.467C-7.246,11.356 -5.215,12.721 -2.911,13.355"
                      />
                    </g>
                  </g>

                  <g
                    transform="matrix(1,0,0,1,74.012,68.338)"
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
                        d="M-1.513,3.18C-1.112,3.578 -0.568,3.802 -0.001,3.804C0.567,3.803 1.11,3.578 1.512,3.18C1.914,2.782 2.14,2.243 2.142,1.679C2.142,1.679 2.142,-1.746 2.142,-1.746C2.124,-2.298 1.89,-2.821 1.49,-3.205C1.09,-3.589 0.556,-3.804 0,-3.804C-0.556,-3.804 -1.09,-3.589 -1.49,-3.205C-1.89,-2.821 -2.124,-2.298 -2.142,-1.746C-2.142,-1.746 -2.142,1.679 -2.142,1.679C-2.14,2.242 -1.914,2.782 -1.513,3.18z"
                      />
                    </g>
                  </g>

                  <g
                    transform="matrix(1,0,0,1,76,98)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(255,255,255)"
                        fillOpacity="1"
                        d="M-3.188,-8.625C-3.188,-8.625 -7,-3.125 -7,-3.125C-7,-3.125 -7,35.5 -7,35.5C-7,35.5 23.125,30 23.125,30C23.125,30 22.875,19.688 22.875,19.688C22.875,19.688 14.375,15.312 14.375,15.312C14.375,15.312 2.812,14.5 2.812,14.5C2.812,14.5 2.812,-4.938 2.812,-4.938C2.812,-4.938 -3.188,-8.625 -3.188,-8.625z"
                      />
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,221,56)"
                        strokeOpacity="1"
                        strokeWidth="0"
                        d="M-3.188,-8.625C-3.188,-8.625 -7,-3.125 -7,-3.125C-7,-3.125 -7,35.5 -7,35.5C-7,35.5 23.125,30 23.125,30C23.125,30 22.875,19.688 22.875,19.688C22.875,19.688 14.375,15.312 14.375,15.312C14.375,15.312 2.812,14.5 2.812,14.5C2.812,14.5 2.812,-4.938 2.812,-4.938C2.812,-4.938 -3.188,-8.625 -3.188,-8.625z"
                      />
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(255,255,255)"
                        fillOpacity="1"
                        d="M-15.312,20.062C-15.312,20.062 -19.75,21 -19.75,21C-19.75,21 -22.375,24.688 -22.375,24.688C-22.375,24.688 -22.375,29.188 -22.375,29.188C-22.375,29.188 -5.562,45.188 -5.562,45.188C-5.562,45.188 -5.812,49.688 -5.812,49.688C-5.812,49.688 18.375,49.25 18.375,49.25C18.375,49.25 18.5,46.125 18.5,46.125C18.5,46.125 22.312,33 22.312,33C22.312,33 24.125,24.562 24.125,24.562C24.125,24.562 11.75,21.375 11.75,21.375C11.75,21.375 -4.938,27.438 -4.938,27.438C-4.938,27.438 -9.375,23.75 -9.375,23.75C-9.375,23.75 -15.312,20.062 -15.312,20.062z"
                      />
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,221,56)"
                        strokeOpacity="1"
                        strokeWidth="0"
                        d="M-15.312,20.062C-15.312,20.062 -19.75,21 -19.75,21C-19.75,21 -22.375,24.688 -22.375,24.688C-22.375,24.688 -22.375,29.188 -22.375,29.188C-22.375,29.188 -5.562,45.188 -5.562,45.188C-5.562,45.188 -5.812,49.688 -5.812,49.688C-5.812,49.688 18.375,49.25 18.375,49.25C18.375,49.25 18.5,46.125 18.5,46.125C18.5,46.125 22.312,33 22.312,33C22.312,33 24.125,24.562 24.125,24.562C24.125,24.562 11.75,21.375 11.75,21.375C11.75,21.375 -4.938,27.438 -4.938,27.438C-4.938,27.438 -9.375,23.75 -9.375,23.75C-9.375,23.75 -15.312,20.062 -15.312,20.062z"
                      />
                    </g>
                  </g>

                  <g
                    transform="matrix(1,0,0,1,76.706,116.382)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                      <path
                        className="z-[50]"
                        id="hand-svg"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                        stroke="rgb(0,78,43)"
                        strokeOpacity="1"
                        strokeWidth="1.5"
                        d="M8.709,13.708C8.709,13.708 8.847,13.45 8.847,13.45C10.674,9.82 11.624,5.818 11.623,1.76C11.623,1.064 11.37,0.392 10.91,-0.134C10.45,-0.66 9.815,-1.002 9.121,-1.1C9.121,-1.1 1.496,-2.192 1.496,-2.192C1.496,-2.192 1.496,-10.747 1.496,-10.747C1.502,-11.13 1.427,-11.51 1.277,-11.864C1.127,-12.218 0.907,-12.537 0.627,-12.802C0.338,-13.116 -0.02,-13.362 -0.418,-13.52C-0.816,-13.678 -1.245,-13.745 -1.673,-13.715C-2.414,-13.623 -3.094,-13.264 -3.586,-12.706C-4.078,-12.148 -4.346,-11.431 -4.34,-10.69C-4.34,-10.69 -4.34,3.612 -4.34,3.612C-4.34,3.612 -6.355,1.674 -6.355,1.674C-6.935,1.1 -7.72,0.777 -8.539,0.777C-9.358,0.777 -10.144,1.1 -10.724,1.674C-11.298,2.257 -11.62,3.039 -11.623,3.854C-11.612,4.645 -11.289,5.401 -10.724,5.959C-10.724,5.959 -2.823,13.722 -2.823,13.722"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="flex items-center flex-col min-h-[30vh] max-sm:min-h-[200px] justify-center">
            <div className="h-[20vh] max-sm:h-[150px] flex items-center flex-col justify-center">
              <p className="font-black intro-heading text-[1.1vw] max-sm:text-[16px] font-body tracking-tight w-full text-green-800">
                {" "}
                Our CCUS mission
              </p>
              <p className="w-[90%] text-[1.1vw] max-sm:text-[14px] pt-[1vw] max-sm:pt-4 font-normal font-display intro-text tracking-tight leading-[1.1]">
                At Heidelberg Materials we are taking the lead in decarbonising
                our sector. We are pioneering Carbon Capture, Utilisation and
                Storage, laying the foundation for scaling CCUS across our global
                operations.
              </p>
            </div>
            <div className="flex items-center justify-center h-[10vh] max-sm:h-[50px]">
              <div
                onClick={handleEnter}
                onMouseEnter={playSoundHover}
                className="flex items-center mt-[1.2vw] max-sm:mt-4 group cursor-pointer w-fit justify-center gap-[1vw] max-sm:gap-2 bg-[#E6E6DF] rounded-full p-[.3vw] max-sm:p-1"
              >
                <div className="bg-[#00DD39] group-hover:scale-105 duration-300 transition-all p-[1vw] max-sm:p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[1vw] max-sm:w-4 object-contain h-[1vw] max-sm:h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
                <p className="text-[.9vw] max-sm:text-[14px] pr-[1.2vw] max-sm:pr-4 text-zinc-700 font-display">
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
