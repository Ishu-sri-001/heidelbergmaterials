"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import useCursorRepel from "@/components/hooks/cursor-repel";
import { useParticleFormation } from "@/components/hooks/particle-formation";
import { degToRad } from "three/src/math/MathUtils";

let circleTexture;
if (typeof window !== "undefined") {
  circleTexture = new THREE.TextureLoader().load("/assets/circlee.jpg");
}

export default function Chain({
  geometry,
  index,
  total,
  ActiveProperties,
  SetActiveProperties,
  isZoomed,
}) {
  const { repeal, dispersion } = ActiveProperties[3];
  const ref = useRef();

  const angle = (index / total) * Math.PI * 2;
  const radiusX = 8;
  const radiusY = 5;
  const yOffset = -2;

  // base oval position
  let x = Math.cos(angle) * radiusX;
  let y = Math.sin(angle) * radiusY + yOffset;

  // rotate whole oval in XY plane (clockwise)
  const rotation = -Math.PI / 6; // -30 degrees
  const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation) - 1;
  const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation) + 1.7;

  // Sample points from geometry
  const { pointsGeo, targetPositions } = useMemo(() => {
    if (!geometry) return { pointsGeo: null, targetPositions: null };

    const mesh = new THREE.Mesh(geometry);
    const sampler = new MeshSurfaceSampler(mesh).build();

    const numPoints = 8000;
    const positions = new Float32Array(numPoints * 3);
    const tempPosition = new THREE.Vector3();

    for (let j = 0; j < numPoints; j++) {
      sampler.sample(tempPosition);
      positions.set([tempPosition.x, tempPosition.y, tempPosition.z], j * 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return {
      pointsGeo: geo,
      targetPositions: new Float32Array(positions),
    };
  }, [geometry]);

  const { animateToMesh, disperseParticles } = useParticleFormation(
    ref,
    targetPositions,
    {
      showControls: true,
      controlLabel: "Globe",
      controlId: `globe-${index}`,
    },
    dispersion
  );

  useCursorRepel(ref, 0.3, 0.1, repeal);

  const baseRotation = {
    x: degToRad(0),
    y: degToRad(0),
    z: degToRad(40),
  };

  let tiltDir = 1;

const zoomedBaseRotation = {
  x: degToRad(-100),
  y: degToRad(20),
  z: degToRad(0),
};

useFrame(() => {
  if (!ref.current) return;

  if (!isZoomed) {
    ref.current.rotation.x = baseRotation.x;
    ref.current.rotation.y = baseRotation.y;

    ref.current.rotation.z += 0.001 * tiltDir;

    if (ref.current.rotation.z > baseRotation.z + 0.08) tiltDir = -1;
    if (ref.current.rotation.z < baseRotation.z - 0.08) tiltDir = 1;
  } else {
   
    ref.current.rotation.x = zoomedBaseRotation.x;
    ref.current.rotation.z = zoomedBaseRotation.z;

    ref.current.rotation.y += 0.002 * tiltDir;

    if (ref.current.rotation.y > zoomedBaseRotation.y + 0.08) tiltDir = -1;
    if (ref.current.rotation.y < zoomedBaseRotation.y - 0.08) tiltDir = 1;
  }
});


  if (!pointsGeo) return null;

  return (
    <points
      ref={ref}
      geometry={pointsGeo}
      position={[rotatedX, rotatedY, 0]}
      scale={[2.7, 2.7, 2.7]}
    >
      <pointsMaterial
        color="white"
        size={0.008}
        sizeAttenuation
        transparent
        alphaTest={0.5}
        map={circleTexture}
        alphaMap={circleTexture}
      />
    </points>
  );
}
