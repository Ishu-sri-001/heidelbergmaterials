"use client";

import { useMemo, forwardRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

let circleTexture;
if (typeof window !== 'undefined') {
  circleTexture = new THREE.TextureLoader().load("/assets/circlee.jpg");
}

const PointsMesh = forwardRef(function PointsMesh({ geometry, position, rotation }, ref) {
  const pointsGeo = useMemo(() => {
    if (!geometry) return null;

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
    return geo;
  }, [geometry]);

  if (!pointsGeo) return null;

  return (
    <points
      ref={ref}
      geometry={pointsGeo}
      position={position}
      scale={[2.7, 2.7, 2.7]}
      rotation={rotation}
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
})

export default PointsMesh
