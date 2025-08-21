'use client'
import ModelViewer from "@/components/ModelViewer";
import IntroBox from "@/components/UI/IntroBox";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

export default function Home() {
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  return (
    <>
      <ModelViewer  cameraPos={cameraPos} setCameraPos={setCameraPos}/>
      <IntroBox setCameraPos={setCameraPos} />
    </>
  );
}
