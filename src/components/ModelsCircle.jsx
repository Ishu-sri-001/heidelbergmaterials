"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import Bottle from "./meshes/Bottle";
import Chain from "./meshes/Chain";
import Flask from "./meshes/Flask";
import NetZero from "./meshes/NetZero";
import GlobeHigh from "./meshes/GlobeHigh";
import LightTube from "./meshes/LightTube";
import { degToRad } from "three/src/math/MathUtils";
import Token3d from "./UI/Token3D";
import gsap from "gsap";

export default function ModelsCircle({
  url,
  cameraRotation,
  groupRotation,
  setGroupRotation,
  ActiveProperties,
  SetActiveProperties,
  isZoomed,
  groupPosn,
  setGroupPosn,
}) {
  const { nodes } = useGLTF(url);

  useEffect(() => {}, [nodes]);

  const meshConfig = [
    { name: "LightTube", points: 15000, Component: LightTube, index: 0 },
    { name: "NetZero", points: 15000, Component: NetZero, index: 1 },
    { name: "GlobeHigh", points: 15000, Component: GlobeHigh, index: 2 },
    { name: "Flask", points: 15000, Component: Flask, index: 3 },
    { name: "Bottle", points: 15000, Component: Bottle, index: 4 },
    { name: "Chain", points: 15000, Component: Chain, index: 5 }
  ];

  const total = meshConfig.length;
  const wholeMeshRef = useRef();

  return (
    <group
      ref={wholeMeshRef}
      scale={0.15}
      rotation={[
        degToRad(cameraRotation.x),
        degToRad(cameraRotation.y),
        degToRad(cameraRotation.z),
      ]}
      position={[groupPosn.x, groupPosn.y, groupPosn.z]}
    >
      {meshConfig.map(({ name, Component, index, points }) => (
        <Component
          key={name}
          geometry={nodes[name]?.geometry}
          index={index}
          total={total}
          ActiveProperties={ActiveProperties}
          SetActiveProperties={SetActiveProperties}
          isZoomed={isZoomed}
          points={points}
        />
      ))}
    </group>
  );
}
