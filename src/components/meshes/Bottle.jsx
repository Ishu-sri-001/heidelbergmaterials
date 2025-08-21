"use client";

import PointsMesh from "../PointsMesh";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Bottle({ geometry, index, total }) {
  const ref = useRef();

  const angle = (index / total) * Math.PI * 2;
  const radiusX = 8; 
  const radiusY = 5;    // vertical stretch
  const yOffset = -2;   // move oval down a bit

  // base oval position
  let x = Math.cos(angle) * radiusX;
  let y = Math.sin(angle) * radiusY + yOffset;

  // rotate whole oval in XY plane (clockwise)
  const rotation = -Math.PI / 6; // -30 degrees
  const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation);
  const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation)-0.5;

   useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      // 2 = speed, 0.3 = max angle (radians ~17°)
    }
  });

  return (
    <PointsMesh
      geometry={geometry}
       position={[rotatedX, rotatedY, 0]}
      rotation={[0, -angle, 0]}
    />
  );
}
