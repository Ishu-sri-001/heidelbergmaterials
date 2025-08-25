'use client'
import { useEffect, useState } from "react";
import gsap from 'gsap'
import WholeExperience from "@/components/WholeExperience";
import { activePropertiesArray } from "./Utils/data";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const [showIntroBox, setShowIntroBox] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: -0.1,
    z: 3
  })

  const [cameraRotation, setCameraRotation] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [groupRotation, setGroupRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
  })

  const [ActiveProperties, SetActiveProperties] = useState(activePropertiesArray)

  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleCameraRotation = () => {
  //   SetActiveProperties((prevProps) => {
  //     const newProps = [...prevProps];
  //     newProps.forEach(prop => prop.repeal = false);

  //     const nextIndex = currentIndex >= 5 ? 0 : currentIndex + 1;
  //     const prevIndex = currentIndex >= 5 ? 0 : currentIndex + 1;

  //     newProps[prevIndex].repeal = true;
  //     newProps[prevIndex].dispersion = false;

  //     newProps[currentIndex].dispersion = true;

  //     setCurrentIndex(nextIndex);
  //     return newProps;
  //   });

  //   const newRotation = { ...cameraRotation };
  //   gsap.to(newRotation, {
  //     z: newRotation.z + 55,
  //     duration: 1,
  //     ease: "power2.inOut",
  //     onUpdate: () => {
  //       setCameraRotation({ ...newRotation });
  //     },
  //   });
  // };

  useEffect(() => {
    const sections = [
      { id: 'earth', rotation: 98 },
      { id: 'circle', rotation: 153 },
      { id: 'bulb', rotation: 208 },
      { id: 'pin', rotation: 263 },
      { id: 'bottle', rotation: 318 },
      { id: 'flask', rotation: 373 },
      { id: 'flask1', rotation: 395 }
    ];

    let newRotation = { ...cameraRotation, x: -90, y: 0, z: 43 };

    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${section.id}Section`,
          start: 'top top',
          end: 'bottom',
          scrub: 1,
          markers: true
        }
      });

      tl.to(newRotation, {
        z: section.rotation,
        duration: 2,
        ease: "linear",
        onUpdate: () => {
          setCameraRotation({ ...newRotation });
        },
        onStart: () => {
          SetActiveProperties(prevProps => {
            const newProps = [...prevProps];
            const sectionIndex = sections.findIndex(s => s.id === section.id);
            if (sectionIndex !== -1 && newProps[sectionIndex]) {
              newProps[sectionIndex].repeal = true;
              newProps[sectionIndex].dispersion = false;
            }
            return newProps;
          });
        },
        onComplete: () => {
          setTimeout(() => {
            SetActiveProperties(prevProps => {
              const newProps = [...prevProps];
              const sectionIndex = sections.findIndex(s => s.id === section.id);
              if (sectionIndex !== -1 && newProps[sectionIndex]) {
                newProps[sectionIndex].dispersion = true;
                newProps[sectionIndex].repeal = false;
              }
              return newProps;
            });
          }, -1500);
        }
      }); 
    });
  }, []);
  return (
    <>
      <WholeExperience
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        cameraRotation={cameraRotation}
        setCameraRotation={setCameraRotation}
        groupRotation={groupRotation}
        setGroupRotation={setGroupRotation}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        showIntroBox={showIntroBox}
        setShowIntroBox={setShowIntroBox}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isZoomed={showSidebar}
      // handleCameraRotation={handleCameraRotation}
      />
      {/* SCROLLABLE SECTIONS */}
      {/* <div className="h-screen bg-red-300 w-full mainSection " /> */}
      <div className="h-screen bg-red-300 w-full earthSection " />
      <div className="h-screen bg-red-500 w-full circleSection" />
      <div className="h-screen bg-red-600 w-full bulbSection" />
      <div className="h-screen bg-red-700 w-full pinSection" />
      <div className="h-screen bg-red-800 w-full bottleSection" />
      <div className="h-screen bg-red-900 w-full flaskSection" />
      <div className="h-screen bg-red-900 w-full flask1Section" />
      <div className="h-screen bg-red-900 w-full flask2Section" />
    </>

  );
}