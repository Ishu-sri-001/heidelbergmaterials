"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import useCursorRepel from "@/components/hooks/cursor-repel";
import { useParticleFormation } from "@/components/hooks/particle-formation";


let circleTexture;
if (typeof window !== 'undefined') {
  circleTexture = new THREE.TextureLoader().load("/assets/circlee.jpg");
}


export default function GlobeHigh({ geometry, index, total, ActiveProperties, SetActiveProperties}) {
  const {repeal, dispersion} = ActiveProperties[0]
  const ref = useRef();
  const [animationFunctions, setAnimationFunctions] = useState(null);
  
  const angle = (index / total) * Math.PI * 2;
  const radiusX = 8; 
  const radiusY = 5; 
  const yOffset = -2;

  // base oval position
  let x = Math.cos(angle) * radiusX;
  let y = Math.sin(angle) * radiusY + yOffset;

  // rotate whole oval in XY plane (clockwise)
  const rotation = -Math.PI / 6; // -30 degrees
  const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation) + 1;
  const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);

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
      targetPositions: new Float32Array(positions) 
    };
  }, [geometry]);

  const { animateToMesh, disperseParticles } = useParticleFormation(ref, 
    targetPositions, {
    showControls: true,
    controlLabel: 'Globe',
    controlId: `globe-${index}`
  },
  dispersion,
);

// console.log(dispersion , 'dispersion')
  // Store animation functions for external access (optional)
  useEffect(() => {
    setAnimationFunctions({ animateToMesh, disperseParticles });
  }, [animateToMesh, disperseParticles]);

  useCursorRepel(ref, 0.3, 0.1, repeal);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  if (!pointsGeo) return null;

  return (
    <points
      ref={ref}
      geometry={pointsGeo}
      position={[rotatedX, rotatedY, 0]}
      scale={[2.7, 2.7, 2.7]}
      rotation={[0, -angle, 0]}
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