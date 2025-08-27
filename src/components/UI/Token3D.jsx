"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Token3d() {
  const tokenRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    gsap.to(tokenRef.current, {
      y: -10,
      x: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleMouseEnter = () => {
    if (!isAnimating) {
      gsap.to(tokenRef.current, {
        rotateY: 360,
        duration: 1,
        ease: "linear",
        onComplete: () => {
          setIsAnimating(true);
        },
      });
    }
  };

  const handleMouseLeave = () => {
    if (isAnimating) {
      gsap.to(tokenRef.current, {
        rotateY: 0,
        duration: 1,
        ease: "linear",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <div className="h-screen fixed inset-0 z-[999] w-full flex items-center justify-center bg-green-900">
      <div
        ref={tokenRef}
        className="flex items-center justify-center bg-zinc-200 shadow-xl hover:cursor-pointer"
        style={{
          width: "10vw",
          height: "10vw",
          borderRadius: "0.5vw 3vw 0.5vw 3vw",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute flex items-center justify-center bg-zinc-200 w-full h-full"
          style={{
            transform: `translateZ(1px)`,
            borderRadius: "0.5vw 3vw 0.5vw 3vw",
          }}
        >
          <Image
            src={"/favicon.png"}
            alt="token"
            className="w-[5vw] h-[5vw]"
            width={100}
            height={100}
          />
        </div>
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className={`absolute ${index == 19? " bg-zinc-200" : "bg-white"} w-full h-full `}
            style={{
              transform: `translateZ(-${index+1}px)`,
              borderRadius: "0.5vw 3vw 0.5vw 3vw",
            }}
          />
        ))}
      </div>
    </div>
  );
}
