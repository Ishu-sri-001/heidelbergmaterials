"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelsCircle from "./ModelsCircle";
import BGParticles from "./Particles";
import { EffectComposer, GodRays, Vignette } from "@react-three/postprocessing";

export default function ModelViewer() {
  return (
    <div className="h-screen w-full relative bg-gradient-to-l from-[#05381D] to-[#145030]">
      <Canvas camera={{ position: [0, 3, 0], fov: 50 }}>
        <BGParticles />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} />
        <ModelsCircle url="/models/model.glb" />
        <OrbitControls enablePan={false} />
        <EffectComposer>
          <Vignette offset={0.8} darkness={0.5} eskil={false} />
         
        </EffectComposer>
      </Canvas>
    </div>
  );
}
