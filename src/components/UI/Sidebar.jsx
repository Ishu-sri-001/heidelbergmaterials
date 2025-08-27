"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayTickSound, { PlayHoverSound, useBackgroundAudio } from "../Audio/SFX";
import gsap from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Sidebar = ({ activeSectionId, setPlaySound, playSound, setActiveSectionId }) => {
  const { PlaySoundBackground } = useBackgroundAudio();
  const { playSoundHover } = PlayHoverSound();
  const { playSoundTick } = PlayTickSound();
      const menuItems = [
    {
      icon: "/assets/svg/earth-logo.svg",
      id:'earth',
      text: "CCUS around the world",
      height: "1.7vw",
      width: "fit",
      gap: "1vw",
    },
    {
      icon: "/assets/svg/netzero-logo.svg",
      id:'circle',
      text: "Net zero",
      height: "2vw",
      width: "2vw",
      gap: "1.5vw",
    },
     {
      icon: "/assets/svg/bulb-logo.svg",
      id:'bulb',
      text: "Stakeholder engagement",
      height: "2.5vw",
      width: "2vw",
      gap: "1.5vw",
    },
     {
      icon: "/assets/svg/chain-logo.svg",
      id:'pin',
      text: "Value chains & business cases",
      height: "1.7vw",
      width: "1.7vw",
      gap: "1.5vw",
    },

     {
      icon: "/assets/svg/bottle-logo.svg",
      id:'bottle',
      text: "CO2 Utilization",
      height: "1.9vw",
      width: "1.9vw",
      gap: "1vw",
    },  
    {
      icon: "/assets/svg/flask-logo.svg",
      id:'flask',
      text: "Capture technologies lab",
      height: "2vw",
      width: "2vw",
      gap: "1vw",
    },  
  ];

  const handleScrollTo = (id) => {
    playSoundTick()
    const target = document.querySelector(`.${id}Section`);
  if (target) {
    const targetY = target.getBoundingClientRect().top + window.scrollY; 
    const currentY = window.scrollY;

    const isScrollingDown = targetY > currentY;

    gsap.to(window, {
      duration: 1.5,
      ease: "power2.out",
      scrollTo: {
        y: target,
        offsetY: isScrollingDown ? 0 : 0, 
      },
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

  return (
    <>
      <div className="absolute inset-0  w-fit text-white">
        <div className="flex flex-col p-[1.5vw] relative gap-[1.5vw]">
          <div className="absolute top-0 left-0  w-[10vw] h-[100vh] z-[0] bg-gradient-to-r from-[#028541] opacity-50 blur-3xl to-[#133b24]">
            <div className=""></div>
          </div>
          <div className="w-[4vw] z-[10] h-[4vw]">
            <Image
              src="/assets/svg/logoo.svg"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>

          <div className="flex flex-col z-[10] group pt-[7vw] pl-[2vw] gap-[2.2vw]">
            {menuItems.map((item, index) => (
              <div
                key={index}
                // onClick={playSoundTick}
                 onClick={() => handleScrollTo(item.id)}
                onMouseEnter={playSoundHover}
                className={`flex gap-[1vw] items-center hover:opacity-100 cursor-pointer ${
                  item.id === activeSectionId ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`h-[${item.height}] w-[${item.width}] items-center`}
                >
                  <Image
                    src={item.icon}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                    alt="logo"
                  />
                </div>
                <p className="font-display text-[0.9vw] hidden group-hover:block">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          setPlaySound((prev) => !prev)
          playSoundTick()
        }}
        onMouseEnter={playSoundHover}
        className="soundButton rounded-tr-[1.5vw] cursor-pointer rounded-bl-[1.5vw] p-[1.5vw] z-[999] absolute bottom-[1vw] right-[1vw] bg-teal-600/20 backdrop-blur-[10px] border-white/40 border"
      >
        {playSound ? (
          <svg
            className="h-[1vw] w-[1vw] object-contain"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 16"
          >
            <path
              stroke="#fff"
              d="M.84 10.59V5.443h3.615l4.16-3.446v12.079l-4.16-3.486H.84Z"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-[1vw] w-[1vw] object-contain"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 16"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M.84 10.59V5.443h3.615l4.16-3.446v12.079l-4.16-3.486H.84Z M1 1l8 14"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default Sidebar;



// import Image from "next/image";
// import React from "react";

// const Sidebar = ({activeSectionId}) => {
//   const menuItems = [
//     {
//       icon: "/assets/svg/earth-logo.svg",
//       id:'earth',
//       text: "CCUS around the world",
//       height: "1.7vw",
//       width: "fit",
//       gap: "1vw",
//     },
//     {
//       icon: "/assets/svg/netzero-logo.svg",
//       id:'circle',
//       text: "Net zero",
//       height: "2vw",
//       width: "2vw",
//       gap: "1.5vw",
//     },
//      {
//       icon: "/assets/svg/bulb-logo.svg",
//       id:'bulb',
//       text: "Stakeholder engagement",
//       height: "2.5vw",
//       width: "2vw",
//       gap: "1.5vw",
//     },
//     {
//       icon: "/assets/svg/flask-logo.svg",
//       id:'flask',
//       text: "Capture technologies lab",
//       height: "2vw",
//       width: "2vw",
//       gap: "1vw",
//     },
//     {
//       icon: "/assets/svg/chain-logo.svg",
//       id:'pin',
//       text: "Value chains & business cases",
//       height: "1.7vw",
//       width: "1.7vw",
//       gap: "1.5vw",
//     },
//     {
//       icon: "/assets/svg/bottle-logo.svg",
//       id:'bottle',
//       text: "CO2 Utilization",
//       height: "1.9vw",
//       width: "1.9vw",
//       gap: "1vw",
//     },    
//   ];

//   return (
//     <div className="absolute inset-0  w-fit text-white">
//       <div className="flex flex-col p-[1.5vw] relative gap-[1.5vw]">
//         <div className="absolute top-0 left-0  w-[10vw] h-[100vh] z-[0] bg-gradient-to-r from-[#028541] opacity-50 blur-3xl to-[#133b24]">
//           <div className=""></div>
//         </div>
//         <div className="w-[4vw] z-[10] h-[4vw]">
//           <Image
//             src="/assets/svg/logoo.svg"
//             width={100}
//             height={100}
//             className="w-full h-full object-cover"
//             alt="logo"
//           />
//         </div>

//         <div className="flex flex-col z-[10] group pt-[7vw] pl-[2vw] gap-[2.2vw]">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex gap-[1vw] items-center hover:opacity-100 cursor-pointer ${
//   item.id === activeSectionId ? "opacity-100" : "opacity-50"
// }`}

//             >
//               <div
//                 className={`h-[${item.height}] w-[${item.width}] items-center`}
//               >
//                 <Image
//                   src={item.icon}
//                   width={100}
//                   height={100}
//                   className="w-full h-full object-contain"
//                   alt="logo"
//                 />
//               </div>
//               <p className="font-display text-[0.9vw] hidden group-hover:block">
//                 {item.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

