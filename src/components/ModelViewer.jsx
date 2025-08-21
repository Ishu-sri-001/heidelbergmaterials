"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelsCircle from "./ModelsCircle";

export default function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 3, 15], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} />
      <ModelsCircle url="/models/model.glb" />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
