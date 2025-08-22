'use client'
import ModelViewer from "@/components/ModelViewer";
import IntroBox from "@/components/UI/IntroBox";
import { useEffect, useState } from "react";
import Sidebar from "@/components/UI/Sidebar";
import gsap from 'gsap'

export default function Home() {
  const [showIntroBox, setShowIntroBox] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: -0.1,
    z: 2.3
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

  const [ActiveProperties, SetActiveProperties] = useState([
    {
      name: "Earth",
      repeal: false,
      dispersion: false,
    },
    {
      name: "circle",
      repeal: false,
      dispersion: false,
    },
    {
      name: "bulb",
      repeal: false,
      dispersion: false,
    },
    {
      name: "pin",
      repeal: false,
      dispersion: false,
    },
    {
      name: "bottle",
      repeal: false,
      dispersion: false,
    },
    {
      name: "flask",
      repeal: false,
      dispersion: false,
    },
  ])

  const handleCameraRotation = (prev) => {
    // First update the properties to form the NetZero mesh
    SetActiveProperties(prevProps => 
      prevProps.map((item, i) => {
        if (i === 1) { // NetZero (circle)
          return {
            ...item,
            repeal: false,    // Turn off repeal
            dispersion: false // Turn off dispersion to form the mesh
          };
        }
        return item;
      })
    );

    // Then animate camera
    const prevValue = prev + 150;
    gsap.to(cameraRotation, {
      z: prevValue,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => setCameraRotation({ ...cameraRotation })
    });
  }

  useEffect(() => {
    console.log(ActiveProperties)
  }, [ActiveProperties])

  return (
    <>
      <ModelViewer
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        cameraRotation={cameraRotation}
        setCameraRotation={setCameraRotation}
        groupRotation={groupRotation}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        setGroupRotation={setGroupRotation}
      />

      {showIntroBox && (
        <IntroBox 
          groupRotation={groupRotation} 
          setGroupRotation={setGroupRotation} 
          setCameraRotation={setCameraRotation} 
          setCameraPos={setCameraPos} 
          ActiveProperties={ActiveProperties} 
          SetActiveProperties={SetActiveProperties} 
          setShowIntroBox={setShowIntroBox}
          setShowSidebar={setShowSidebar} 
        />
      )}

      {showSidebar && (
        <Sidebar />
      )}

      <div onClick={() => handleCameraRotation(0)} className="absolute bottom-[10%] right-[20%] z-[999] bg-white text-black p-[2vw]">
        <p onClick={() => handleCameraRotation(0)}>GhumJA</p>
      </div>
    </>
  );
}