"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import useCursorRepel from "@/components/hooks/cursor-repel"; 

function ParticleFromModel({ url, meshName, scale = 1 }) {
  const { scene } = useGLTF(url);
  const pointsRef = useRef();

  const particleGeometry = useMemo(() => {
    let mesh = null;
    scene.traverse((child) => {
      if (child.isMesh) {
        // console.log("Mesh found:", child.name);
        if (child.name === meshName) mesh = child;
      }
    });

    if (!mesh) {
      console.warn(`Mesh with name "${meshName}" not found.`);
      return null;
    }

    const cloned = mesh.clone();
    cloned.geometry = cloned.geometry.clone();
    cloned.geometry.scale(scale, scale, scale);

    const sampler = new MeshSurfaceSampler(cloned).build();
    const numParticles = 5000;
    const positions = new Float32Array(numParticles * 3);
    const tempPos = new THREE.Vector3();

    for (let i = 0; i < numParticles; i++) {
      sampler.sample(tempPos);
      positions.set([tempPos.x, tempPos.y, tempPos.z], i * 3);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [scene, meshName, scale]);

  // use cursor repel effect
  useCursorRepel(pointsRef, 0.3, 0.25);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.1;
    }
  });

  if (!particleGeometry) return null;

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <pointsMaterial color="white" size={0.02} sizeAttenuation />
    </points>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ background: "black", width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <ParticleFromModel url="/models/model.glb" meshName="Chain" scale={2} />
    </Canvas>
  );
}
