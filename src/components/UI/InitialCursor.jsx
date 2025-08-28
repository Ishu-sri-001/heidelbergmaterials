"use client";
import React, { useEffect, useState, useRef } from "react";

const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

export default function InitialCursor() {
  const [client, setClient] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const moveTimeoutRef = useRef(null);
  
  const targetRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
        targetRef.current = {
          x: e.clientX,
          y: e.clientY,
        };
      
        setIsMoving(true);
      
        const element = document.elementFromPoint(
          targetRef.current.x,
          targetRef.current.y
        );
      
        const isHidden = element?.closest("[data-hide-cursor]");
        setIsHovering(Boolean(isHidden));
      
        if (moveTimeoutRef.current) {
          clearTimeout(moveTimeoutRef.current);
        }
      
        moveTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      };
      

    const animate = () => {
      setClient(prev => ({
        x: lerp(prev.x, targetRef.current.x, 0.1),
        y: lerp(prev.y, targetRef.current.y, 0.1)
      }));
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="w-[8vw] h-[8vw] z-[999] pointer-events-none border border-white/10 p-[.5vw] rounded-full absolute"
      style={{
        left: `${client.x}px`,
        top: `${client.y}px`,
        transform: "translate(-50%, -50%)",
        opacity: isMoving && !isHovering ? 1 : 0,
        transition: "opacity .7s ease-out"
      }}
    >
      <div className="w-full h-full p-[.5vw] border border-white/10 rounded-full">
        <div className=" bg-white/5  flex items-center justify-center backdrop-blur-[4px] rounded-full w-full h-full">
        <p className="text-white w-[70%] text-[.5vw] leading-[1.25] uppercase text-center font-bold">Scroll To Explore</p>
        </div>
      </div>
    </div>
  );
}
