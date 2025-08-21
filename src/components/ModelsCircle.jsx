"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import Bottle from "./meshes/Bottle";
import Chain from "./meshes/Chain";
import Flask from "./meshes/Flask";
import NetZero from "./meshes/NetZero";
import GlobeHigh from "./meshes/GlobeHigh";
import LightTube from "./meshes/LightTube";
import { degToRad } from "three/src/math/MathUtils";

export default function ModelsCircle({ url, cameraRotation, groupRotation, setGroupRotation}) {
  console.log(cameraRotation)
  const { nodes } = useGLTF(url);

  useEffect(() => {
    console.log("🔹 GLTF Nodes:", nodes);
  }, [nodes]);

  const names = ["Bottle", "Chain", "Flask", "NetZero", "GlobeHigh", "LightTube"];
  const total = names.length;

  return (
    <group scale={.15} rotation={[degToRad(cameraRotation.x),degToRad(cameraRotation.y),degToRad(cameraRotation.z)]}>
      <Bottle geometry={nodes.Bottle?.geometry} index={4} total={total} />
      <GlobeHigh geometry={nodes.GlobeHigh?.geometry} index={2} total={total} />
       <NetZero geometry={nodes.NetZero?.geometry} index={1} total={total} />
      <Chain geometry={nodes.Chain?.geometry} index={5} total={total} />
      <Flask geometry={nodes.Flask?.geometry} index={3} total={total} />
     
      
      <LightTube geometry={nodes.LightTube?.geometry} index={0} total={total} />
    </group>
  );
}
