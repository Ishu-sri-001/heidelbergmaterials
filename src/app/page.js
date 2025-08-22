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

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleCameraRotation = () => {
    // Update active properties first
    SetActiveProperties((prevProps) => {
      const newProps = [...prevProps];
      newProps.forEach(prop => prop.repeal = false);
      
      const nextIndex = currentIndex >= 5 ? 0 : currentIndex + 1;
      const prevIndex = currentIndex >= 5 ? 0 : currentIndex + 1;
      
      newProps[prevIndex].repeal = true;
      newProps[prevIndex].dispersion = false;

      newProps[currentIndex].dispersion = true;
      
      setCurrentIndex(nextIndex);
      return newProps;
    });

    // Create a local copy of rotation to update properly
    const newRotation = { ...cameraRotation };
    gsap.to(newRotation, {
      z: newRotation.z + 55,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        setCameraRotation({ ...newRotation });
      },
    });
  };

  useEffect(() => {
   console.log(ActiveProperties)
   console.log(currentIndex)
  }, [ActiveProperties, currentIndex])
  


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

      <div onClick={() => handleCameraRotation(0)} className="absolute bottom-[5%] right-[5%] z-[999] bg-green-800 text-white p-[1vw] px-[2vw] rounded-full">
        <p onClick={() => handleCameraRotation(0)}>Rotate</p>
      </div>
    </>
  );
}