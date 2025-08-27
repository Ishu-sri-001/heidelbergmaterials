"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import Bottle from "./meshes/Bottle";
import Chain from "./meshes/Chain";
import Flask from "./meshes/Flask";
import NetZero from "./meshes/NetZero";
import GlobeHigh from "./meshes/GlobeHigh";
import LightTube from "./meshes/LightTube";
import { degToRad } from "three/src/math/MathUtils";
import Token3d from "./UI/Token3D";

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

  const names = [
    "Bottle",
    "Chain",
    "Flask",
    "NetZero",
    "GlobeHigh",
    "LightTube",
  ];
  const total = names.length;

  return (
    <group
      scale={0.15}
      rotation={[
        degToRad(cameraRotation.x),
        degToRad(cameraRotation.y),
        degToRad(cameraRotation.z),
      ]}
      position={[groupPosn.x, groupPosn.y, groupPosn.z]}
    >
      <Bottle
        geometry={nodes.Bottle?.geometry}
        index={4}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />

      <GlobeHigh
        geometry={nodes.GlobeHigh?.geometry}
        index={2}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />
      {/* <Html occlude center position={[1, 0.3, 5]}>
        <Token3d />
      </Html> */}
      <NetZero
        geometry={nodes.NetZero?.geometry}
        index={1}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />
      <Chain
        geometry={nodes.Chain?.geometry}
        index={5}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />
      <Flask
        geometry={nodes.Flask?.geometry}
        index={3}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />

      <LightTube
        geometry={nodes.LightTube?.geometry}
        index={0}
        total={total}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        isZoomed={isZoomed}
      />
    </group>
  );
}
