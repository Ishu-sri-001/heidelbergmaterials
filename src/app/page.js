'use client'
import ModelViewer from "@/components/ModelViewer";
import IntroBox from "@/components/UI/IntroBox";
import { useEffect, useState } from "react";

export default function Home() {
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
      dispersion: true,
    },
    {
      name: "circle",
      repeal: false,
      dispersion: true,
    },
    {
      name: "bulb",
      repeal: false,
      dispersion: true,
    },
    {
      name: "pin",
      repeal: false,
      dispersion: true,
    },
    {
      name: "bottle",
      repeal: false,
      dispersion: true,
    },
    {
      name: "flask",
      repeal: false,
      dispersion: true,
    },

  ])

  useEffect(() => {
    console.log(ActiveProperties)
  }, [ActiveProperties])

  return (
    <>
      <ModelViewer cameraPos={cameraPos} setCameraPos={setCameraPos} cameraRotation={cameraRotation} setCameraRotation={setCameraRotation}
        groupRotation={groupRotation} setGroupRotation={setGroupRotation} />
      <IntroBox groupRotation={groupRotation} setGroupRotation={setGroupRotation} setCameraRotation={setCameraRotation} setCameraPos={setCameraPos} ActiveProperties={ActiveProperties} SetActiveProperties={SetActiveProperties} />
    </>
  );
}
