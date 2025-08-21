"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ParticleMeshFromModel from "./ParticleMeshFromModel";

function ModelParticles({ url }) {
  const { nodes } = useGLTF(url);

  // Pick one geometry (like GlobeHigh, Bottle, etc.)
  const geo = nodes.GlobeHigh?.geometry;

  return geo ? <ParticleMeshFromModel geometry={geo} /> : null;
}

export default function ModelParticleViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: "100vw", height: "100vh", background: "black" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} />
      <ModelParticles url="/models/model.glb" />
      <OrbitControls />
    </Canvas>
  );
}
