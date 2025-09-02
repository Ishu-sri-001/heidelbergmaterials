"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  // Group related refs together
  const boxRefs = {
    box1: useRef(null),
    box2: useRef(null),
    box3: useRef(null),
    box4: useRef(null),
  };
  const logoRefs = {
    logo: useRef(null),
    text: useRef(null),
    logoWhitePart: useRef(null),
    logoGreenPart: useRef(null),
    logoBG: useRef(null),
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Animation sequence for boxes
    tl.to(boxRefs.box1.current, {
      scale: 3,
      duration: 1,
      ease: "linear",
    })
      .to(boxRefs.box2.current, {
        scale: 0.8,
        duration: 1,
        delay: -0.5,
        ease: "linear",
      })
      .to(boxRefs.box3.current, {
        scale: 0.7,
        duration: 1,
        delay: -0.5,
        ease: "linear",
      })
      .to(boxRefs.box4.current, {
        scale: 0.6,
        duration: 1,
        delay: -0.5,
        ease: "linear",
      });

    // Animation sequence for logo
    tl.to(logoRefs.logo.current, {
      opacity: 1,
      duration: 1,
      delay: -1,
      ease: "linear",
    })
      .to(logoRefs.logo.current, {
        xPercent: 0,
        duration: 1,
        delay: -1,
        ease: "linear",
      })
      .to(logoRefs.text.current, {
        opacity: 1,
        duration: 1,
        ease: "linear",
      })
      .to(boxRefs.box4.current, {
        borderColor: "rgba(144, 238, 144, .8)",
        borderWidth: "2px",
        duration: 0.5,
      })
      .to(logoRefs.text.current, {
        opacity: 0,
        duration: 0.8,
        ease: "linear",
      })
      .to(logoRefs.logo.current, {
        xPercent: 100,
        duration: 0.8,
        delay: 0.4,
        ease: "linear",
      });

    //Animation Sequence for box border coloros
    tl.to(
      boxRefs.box3.current,
      {
        borderColor: "rgba(144, 238, 144, 0.6)",
        borderWidth: "1px",
        duration: 0.5,
        delay: -0.5,
      },
      "<+.5"
    )
      .to(boxRefs.box2.current, {
        borderColor: "rgba(144, 238, 144, 0.4)",
        borderWidth: "1px",
        opacity: 1,
        duration: 0.5,
        delay: -0.5,
      })
      .to(boxRefs.box1.current, {
        borderColor: "rgba(144, 238, 144, 0.2)",
        borderWidth: "1px",
        opacity: 1,
        duration: 0.5,
        delay: -0.5,
      });
    tl.to(logoRefs.logoGreenPart.current, {
      yPercent: -200,
      duration: 0.8,
      ease: "linear",
    })
      .to(
        logoRefs.logoWhitePart.current,
        {
          yPercent: 200,
          duration: 0.8,
          ease: "linear",
        },
        "<"
      )
      .to(
        logoRefs.logo.current,
        {
          scale: 50,
          duration: 4,
          ease: "power2.inOut",
        },
        "<"
      );
    tl.to(
      ".loaderContainer",
      {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          document.querySelector(".loaderContainer").style.display = "none";
        },
      },
      "<+1.5"
    );

    // Cleanup function
    return () => tl.kill();
  }, []);

  // Common CSS classes
  const boxCommonClasses =
    "h-[60vh] sm:h-[60vh] w-[80vw] sm:w-[30vw] aspect-square rounded-bl-[10%] sm:rounded-bl-[20%] rounded-tr-[10%] sm:rounded-tr-[20%] border-zinc-200 border";

  return (
    <div className="h-screen loaderContainer w-full fixed flex items-center justify-center z-[999] bg-[#F1F1F1]">
      <div
        ref={boxRefs.box1}
        className={`${boxCommonClasses} scale-150 sm:scale-280 flex items-center justify-center`}
      >
        <div ref={boxRefs.box2} className={`${boxCommonClasses} scale-70`}>
          <div ref={boxRefs.box3} className={`${boxCommonClasses} scale-60`}>
            <div
              ref={boxRefs.box4}
              className={`${boxCommonClasses} scale-50 flex items-center justify-center relative gap-[3vw] sm:gap-[1vw] border-[2px]`}
            >
              <div
                ref={logoRefs.logo}
                className="absolute z-[100] rounded-tr-[3vw] sm:rounded-tr-[1vw] rounded-bl-[3vw] sm:rounded-bl-[1vw] translate-x-[-100%] opacity-0 h-[15vw] sm:h-[5vw] w-[15vw] sm:w-[5vw]"
              >
                <svg
                  id="logo"
                  width="59"
                  height="57"
                  fill="none"
                  viewBox="0 0 59 57"
                  className="h-[15vw] sm:h-[5vw] p-[1.5vw] sm:p-[.5vw] w-[15vw] sm:w-[5vw]"
                >
                  <defs>
                    <mask id="logoMask">
                      <path
                        d="M58.15 56.845H22.9568C9.76689 56.845 0.973633 48.1027 0.973633 34.9893V0H36.1467C49.3366 0 58.1298 8.7423 58.1298 21.8558V56.845H58.15Z"
                        fill="white"
                      />
                    </mask>
                  </defs>
                  <path
                    className="overflow-hidden maskingSvg"
                    ref={logoRefs.logoBG.current}
                    d="M58.15 56.845H22.9568C9.76689 56.845 0.973633 48.1027 0.973633 34.9893V0H36.1467C49.3366 0 58.1298 8.7423 58.1298 21.8558V56.845H58.15Z"
                    fill="#004E2B"
                    mask="url(#logoMask)"
                  ></path>
                  <g mask="url(#logoMask)">
                    <path
                      ref={logoRefs.logoGreenPart}
                      className="el-green"
                      d="M31.7559 19.6733H36.1525C44.3609 19.6733 49.3424 24.646 49.3424 32.7868V48.0858H44.9458C36.8584 48.0858 31.7559 42.9527 31.7559 34.9724V19.6733Z"
                      fill="#00DD39"
                    ></path>
                    <path
                      ref={logoRefs.logoWhitePart}
                      className="el-white"
                      d="M9.77344 8.74182H27.36V48.0822H22.9633C14.7953 48.0822 9.77344 43.1697 9.77344 34.9687V8.74182Z"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="w-[25vw] sm:w-[10vw] relative h-full">
                <Image
                  ref={logoRefs.text}
                  src="/assets/svg/textLogo.svg"
                  height={100}
                  width={150}
                  alt="Logo Text"
                  className="absolute inset-1/2 translate-y-[-50%] object-contain h-auto w-full translate-x-[-20%] opacity-0"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
