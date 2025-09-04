"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayTickSound, {
  PlayHoverSound,
  PlayScrollSound,
  useBackgroundAudio,
} from "../Audio/SFX";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const Sidebar = ({
  activeSectionId,
  setPlaySound,
  playSound,
  setActiveSectionId,
  SetActiveProperties,
  ActiveProperties,
  set
}) => {
  const { PlaySoundBackground } = useBackgroundAudio();
  const { playSoundHover } = PlayHoverSound();
  const { playSoundTick } = PlayTickSound();
  const menuItems = [
    {
      icon: "/assets/svg/earth-logo.svg",
      id: "earth",
      text: "CCUS around the world",
      height: "1.7vw",
      width: "fit",
      gap: "1vw",
    },
    {
      icon: "/assets/svg/netzero-logo.svg",
      id: "circle",
      text: "Net zero",
    },
    {
      icon: "/assets/svg/bulb-logo.svg",
      id: "bulb",
      text: "Stakeholder engagement",
    },
    {
      icon: "/assets/svg/chain-logo.svg",
      id: "pin",
      text: "Value chains & business cases",
    },

    {
      icon: "/assets/svg/bottle-logo.svg",
      id: "bottle",
      text: "CO2 Utilization",
    },
    {
      icon: "/assets/svg/flask-logo.svg",
      id: "flask",
      text: "Capture technologies lab",
    },
  ];

  const handleScrollTo = (id) => {
    playSoundTick();
    const target = document.querySelector(`.${id}Section`);
    if (target) {
      const targetY = target.getBoundingClientRect().top + window.scrollY;
      const currentY = window.scrollY;

      const isScrollingDown = targetY > currentY;

      gsap.to(window, {
        duration: 5,
        ease: "linear",
        scrollTo: {
          y: target,
          offsetY: -800,
        },
        // onComplete: () => {
        //   SetActiveProperties(prev => {
        //    console.log(prev)
        //   });
        // }
      });

      setActiveSectionId(id);
    }
  };

  useEffect(() => {
    if (playSound) {
      PlaySoundBackground(true);
    } else {
      PlaySoundBackground(false);
    }
  }, [playSound]);

  const { PlayScroll } = PlayScrollSound();

  useEffect(() => {
    // PlayScroll();
    playSoundTick();
  }, [activeSectionId]);

  return (
    <>
      <div data-hide-cursor className="absolute inset-0 w-fit text-white">
        <div className="flex flex-col p-[1.5vw] max-sm:p-4 relative gap-[1.5vw] max-sm:gap-4">
          <div className="absolute top-0 left-0 w-[10vw] max-sm:w-[60px] h-[100vh] z-[0] bg-gradient-to-r from-[#028541] opacity-50 blur-3xl to-[#133b24]">
            <div className=""></div>
          </div>
          <div className="w-[4vw] max-sm:w-[12vw] z-[10] h-[4vw] max-sm:h-[12vw]">
            <Image
              src="/assets/svg/logoo.svg"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>

          <div className="flex flex-col w-full items-start duration-300 transition-all justify-center z-[10] group pt-[8vw] max-sm:pt-[60px] pl-[1.5vw] max-sm:pl-4 gap-[2.2vw] max-sm:gap-[6vw]">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleScrollTo(item.id)}
                onMouseEnter={playSoundHover}
                className={`flex gap-[1vw] max-sm:gap-[5vw] items-center hover:opacity-100 cursor-pointer ${
                  item.id === activeSectionId ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="w-[1.6vw] max-sm:w-[8vw] h-[1.6vw] max-sm:h-[8vw] relative">
                  <Image
                    src={item.icon}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                    alt="logo"
                  />
                </div>
                <p className="font-display text-[0.9vw] max-sm:text-sm hidden group-hover:block">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-hide-cursor
        onClick={() => {
          setPlaySound((prev) => !prev);
          playSoundTick();
        }}
        onMouseEnter={playSoundHover}
        className="soundButton rounded-tr-[1.5vw] max-sm:rounded-tr-3xl cursor-pointer rounded-bl-[1.5vw] max-sm:rounded-bl-3xl p-[1.5vw] max-sm:p-4 z-[999] absolute bottom-[1vw] max-sm:bottom-4 right-[1vw] max-sm:right-4 bg-teal-600/20 backdrop-blur-[10px] border-white/40 border"
      >
        {playSound ? (
          <Image
            src="/assets/svg/sound.svg"
            alt="sound-on"
            width={100}
            height={100}
            className="h-[1.2vw] max-sm:h-5 w-[1.2vw] max-sm:w-5 text-white object-contain"
          />
        ) : (
          <Image
            src="/assets/svg/soundOFF.svg"
            alt="sound-off"
            width={100}
            height={100}
            className="h-[1.2vw] max-sm:h-5 w-[1.2vw] max-sm:w-5 text-white object-contain"
          />
        )}
      </div>
      <NavBar activeSectionId={activeSectionId} playSound={playSound} />
    </>
  );
};

export default Sidebar;

const NavBar = ({ playSound, activeSectionId }) => {
  const [navData, setNavData] = useState("Capture Techlologies Labs");
  const [navLimit, setNavLimit] = useState(false);
  const OpenNavBarAnimation = () => {
    if (navLimit) return;
    const tl = gsap.timeline();
    tl.to(".NavBar-text", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
      .to(".NavBar-text", {
        width: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .set(".NavBar-text", {
        display: "none",
      })
      .to(".navBar", {
        scale: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".navBar", {
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      })
      .set(".NavBar-text", {
        display: "flex",
      })
      .to(".NavBar-text", {
        width: "auto",
        transformOrigin: "center",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(".NavBar-text", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setNavLimit(false);
        },
      });
  };

  useEffect(() => {
    OpenNavBarAnimation();
    setNavData(activeSectionId);
    setNavLimit(true);
  }, [activeSectionId]);

  return (
    <div
      data-hide-cursor
      className="absolute  w-full  h-fit navBar bottom-[1vw] max-sm:bottom-[5vw] left-[0%] flex items-center justify-center  z-[400]"
    >
      <div className="flex items-center mt-[1.2vw] max-sm:mt-4 group cursor-pointer w-fit  justify-center max-sm:translate-x-[-20%] gap-[1vw] max-sm:gap-3 bg-white rounded-full p-[.3vw] max-sm:p-1">
        <div className="bg-[#00DD39] w-[3.5vw] max-sm:w-[40px] h-[3.5vw] max-sm:h-[40px] flex items-center justify-center gap-[2vw] max-sm:gap-6 group-hover:scale-105 duration-300 transition-all p-[1vw] max-sm:p-3 rounded-full">
          <p className="font-thin text-[1.5vw] max-sm:text-xl text-zinc-700">
            +
          </p>
        </div>
        <p className="text-[.9vw] max-sm:text-sm NavBar-text w-fit text-zinc-700 font-display">
          <span className="pr-[1vw] max-sm:pr-[1vw]">
            {navData ? (
              <>  
              This is {navData} section
              </>
            ) : (
              "KEEP SCROLLING"
            )}
          </span>
        </p>
      </div>
    </div>
  );
};
