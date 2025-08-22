'use client'
import ModelViewer from "@/components/ModelViewer";
import IntroBox from "@/components/UI/IntroBox";
import { useEffect, useState } from "react";
import Sidebar from "@/components/UI/Sidebar";

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

  useEffect(() => {
    // console.log(ActiveProperties)
  }, [ActiveProperties])

  return (
    <>
      <ModelViewer cameraPos={cameraPos} setCameraPos={setCameraPos} cameraRotation={cameraRotation} setCameraRotation={setCameraRotation}
        groupRotation={groupRotation} ActiveProperties={ActiveProperties} SetActiveProperties={SetActiveProperties} setGroupRotation={setGroupRotation} />

      {showIntroBox && (

      <IntroBox groupRotation={groupRotation} setGroupRotation={setGroupRotation} setCameraRotation={setCameraRotation} setCameraPos={setCameraPos} ActiveProperties={ActiveProperties} SetActiveProperties={SetActiveProperties} setShowIntroBox={setShowIntroBox}
          setShowSidebar={setShowSidebar} />
      )}

      {showSidebar && (
        <Sidebar />
      )}


    </>
  );
}
