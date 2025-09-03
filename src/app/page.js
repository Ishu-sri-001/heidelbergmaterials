'use client'
import { useEffect, useState } from "react";
import gsap from 'gsap'
import WholeExperience from "@/components/WholeExperience";
import { activePropertiesArray } from "./Utils/data";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import InitialCursor from "@/components/UI/InitialCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const [showIntroBox, setShowIntroBox] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [ModelFade, SetModelFade] = useState(false)
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: -0.1, 
    z: 3
  })
  const [playSound, setPlaySound] = useState(false);

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

  const [activeSectionId, setActiveSectionId] = useState('earth');

  useEffect(() => {
    
    const sections = [
      { id: 'earth', rotation: 98, position: { x: 0, y: 0, z: 1.35 } },
      { id: 'circle', rotation: 98, position: { x: -.0, y: 0, z: 4.2 } },
      { id: 'bulb', rotation: 208, position: { x: -0, y: 0, z: 8.4 } },
      { id: 'pin', rotation: 290, position: { x: -0.2, y: -0.1, z: 12.4 } },
      { id: 'bottle', rotation: 340, position: { x: -0.5, y: -0.1, z: 17.6 } },
      { id: 'flask', rotation: 380, position: { x: -0.6, y: 0, z: 22.1 } },
    ];

    let newRotation = { ...cameraRotation, x: -90, y: 0, z: 45 };
    let newPosition = { ...groupPosn };

    ScrollTrigger.create({
      trigger: ".flask2Section",
      start: "20% bottom",
      end: 'top 70%',
      // markers:true,

    });
    sections.forEach((section) => {      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${section.id}Section`,
          start: 'top top',
          end: 'bottom',
          scrub: true,
          onEnter: () => {
            setActiveSectionId(section.id);
            SetActiveProperties(prevProps => {
              const newProps = [...prevProps];
              const sectionIndex = sections.findIndex(s => s.id === section.id);
              newProps[sectionIndex].dispersion = false;
              return newProps;
            });
          },
          onEnterBack: () => {
            setActiveSectionId(section.id);
            SetActiveProperties(prevProps => {
              const newProps = [...prevProps];
              const sectionIndex = sections.findIndex(s => s.id === section.id);
              const upcomingIndex = sectionIndex +1;
              if (sectionIndex !== -1 && newProps[sectionIndex]) {
                newProps[sectionIndex].dispersion = false;
                console.log('ON ENTER BACK!')
              }
              if(upcomingIndex < newProps.length) {
                newProps[upcomingIndex].dispersion = true;
              }
              return newProps;
            });
          },
          onLeave: () => {
            setActiveSectionId(null);
          },
          onLeaveBack: () => {
            setActiveSectionId(null);
          },
        }
      });

      tl.to(newRotation, {
        // z: section.rotation,
        duration: 2,
        ease: "linear",
        onUpdate: () => {
          setCameraRotation({ ...newRotation });
        },

        onComplete: () => {
          setTimeout(() => {
            SetActiveProperties(prevProps => {
              const newProps = [...prevProps];
              const sectionIndex = sections.findIndex(s => s.id === section.id);
              if (sectionIndex !== -1 && newProps[sectionIndex]) {
                newProps[sectionIndex].dispersion = true;

              }
              return newProps;
            });
          }, -1000);
        }

      });
      tl.to(newPosition, {
        x: section.position.x,
        z: section.position.z,
        duration: 2,
        ease: "linear",
        onUpdate: () => {
          setGroupPosn({ ...newPosition });
        }
      }, 0);
    });
  }, [showIntroBox]);

  useEffect(() => {
    if(!showIntroBox){
      setTimeout(() => {
        SetActiveProperties(prev => {
          return prev.map(item => 
            item.name === 'earth' ? {...item, dispersion: false} : item
          )
        })
      },800)
    }
  
  }, [showIntroBox])
  

  
  return (
    <>
      <WholeExperience
      ModelFade = {ModelFade}
      SetModelFade={SetModelFade}
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
        activeSectionId={activeSectionId}
        playSound={playSound}
        setPlaySound={setPlaySound}
        setActiveSectionId={setActiveSectionId}


      />
      {/* SCROLLABLE SECTIONS */}
      {
        !showIntroBox && <>

          <div className="h-[200vh] w-full earthSection ">
            <InitialCursor />
          </div>
          <div className="h-[200vh] w-full circleSection" />
          <div className="h-[200vh] w-full bulbSection" />
          <div className="h-[200vh] w-full pinSection" />
          <div className="h-[200vh] w-full bottleSection" />
          <div className="h-[200vh] w-full flaskSection" />
          <div className="h-[200vh] w-full flask1Section" />
          <div className="h-[0vh] w-full flask2Section" />
        </>
      }

    </>

  );
}