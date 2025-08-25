'use client'
import { useEffect, useState } from "react";
import gsap from 'gsap'
import WholeExperience from "@/components/WholeExperience";
import { activePropertiesArray } from "./Utils/data";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { OnReloadScrollTop } from "@/components/UI/OnReloadScrollTop";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const [showIntroBox, setShowIntroBox] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  OnReloadScrollTop()
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: -0.1,
    z: 2.2
  })

  const [cameraRotation, setCameraRotation] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [groupPosn, setGroupPosn] = useState({
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


  useEffect(() => {
    const sections = [
      { id: 'earth', rotation: 98, position: { x: 0, y: 0, z: 0 } },
      { id: 'circle', rotation: 153, position: { x: 0.3, y: 0, z: 0 } },
      { id: 'bulb', rotation: 208, position: { x: 0.5, y: 0, z: 0 } },
      { id: 'pin', rotation: 263, position: { x: 0.3, y: 0, z: 0 } },
      { id: 'bottle', rotation: 318, position: { x: 0.5, y: 0, z: 0 } },
      { id: 'flask', rotation: 373, position: { x: 0.6, y: -0.2, z: 0 } },
      { id: 'flask1', rotation: 395, position: { x: 0.6, y: 0, z: 0 } }
    ];

    let newRotation = { ...cameraRotation, x: -90, y: 0, z: 43 };
    let newPosition = { ...groupPosn };

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
      tl.to(newPosition, {
        x: section.position.x,
        y: section.position.y,
        z: section.position.z,
        duration: 2,
        ease: "linear",
        onUpdate: () => {
          setGroupPosn({ ...newPosition });
        },
        onStart: () => {
          console.log(`📍 Position animation started for ${section.id}:`, section.position);
        },
        onComplete: () => {
          console.log(`✅ Position animation completed for ${section.id}. Final position:`, newPosition);
        }
      }, 0);
    });
  }, [showIntroBox]);
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
        groupPosn={groupPosn}
        setGroupPosn={setGroupPosn}

      />
      {/* SCROLLABLE SECTIONS */}
      {
        !showIntroBox && <>
          <div className="h-screen bg-red-300 w-full earthSection " />
          <div className="h-screen bg-red-500 w-full circleSection" />
          <div className="h-screen bg-red-600 w-full bulbSection" />
          <div className="h-screen bg-red-700 w-full pinSection" />
          <div className="h-screen bg-red-800 w-full bottleSection" />
          <div className="h-screen bg-red-900 w-full flaskSection" />
          <div className="h-screen bg-red-900 w-full flask1Section" />
          <div className="h-screen bg-red-900 w-full flask2Section" />
        </>
      }

    </>

  );
}