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
        xPercent: -200,
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
        xPercent: -50,
        duration: 0.8,
        delay: 0.4,
        ease: "linear",
      });

    //Animation Sequence for box border coloros

    tl.to(
      boxRefs.box3.current,
      {
        borderColor: "rgba(144, 238, 144, 0.6)", // rgba(144, 238, 144, 0.7) with opacity
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
      })
      .to(logoRefs.logo.current, {
        scale: 50,
        duration: 4,
        ease: "power2.inOut",
      })
      .to(
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
    "h-[60vh] max-sm:h-[40vh] w-[30vw] max-sm:w-[80vw] aspect-square rounded-bl-[20%] rounded-tr-[20%] border-zinc-200 border";
  const imageCommonClasses =
    "absolute inset-1/2 translate-y-[-50%] object-contain";

  return (
    <div className="h-screen loaderContainer w-full fixed flex items-center justify-center z-[999] bg-[#F1F1F1]">
      <div
        ref={boxRefs.box1}
        className={`${boxCommonClasses} scale-280 flex items-center justify-center`}
      >
        <div ref={boxRefs.box2} className={`${boxCommonClasses} scale-70`}>
          <div ref={boxRefs.box3} className={`${boxCommonClasses} scale-60`}>
            <div
              ref={boxRefs.box4}
              className={`${boxCommonClasses} scale-50 flex items-center justify-center relative gap-[1vw] max-sm:gap-[3vw] border-[2px]`}
            >
              <Image
                ref={logoRefs.logo}
                src="/favicon.png"
                height={100}
                width={100}
                alt="Logo"
                className={`${imageCommonClasses} h-[4vw] max-sm:h-[10vw] w-[4vw] max-sm:w-[10vw] translate-x-[-50%] opacity-0`}
                priority
              />
              <div className="w-[10vw] max-sm:w-[25vw] relative h-full">
                <Image
                  ref={logoRefs.text}
                  src="/assets/svg/textLogo.svg"
                  height={100}
                  width={150}
                  alt="Logo Text"
                  className={`${imageCommonClasses} h-auto w-full translate-x-[-30%] opacity-0`}
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
