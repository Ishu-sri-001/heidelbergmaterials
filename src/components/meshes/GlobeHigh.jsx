"use client";

import PointsMesh from "../PointsMesh";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function GlobeHigh({ geometry, index, total }) {
  const ref = useRef();
  const angle = (index / total) * Math.PI * 2;
  const radiusX = 8; 
  const radiusY = 5; 
    const yOffset = -2;   // move oval down a bit

  // base oval position
  let x = Math.cos(angle) * radiusX;
  let y = Math.sin(angle) * radiusY + yOffset;

  // rotate whole oval in XY plane (clockwise)
  const rotation = -Math.PI / 6; // -30 degrees
  const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation)+1;
  const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <PointsMesh
      ref={ref}
      geometry={geometry}
      position={[rotatedX, rotatedY, 0]}
      rotation={[0, -angle, 0]}
    />
  );
}
