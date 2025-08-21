"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelsCircle from "./ModelsCircle";
import BGParticles from "./Particles";
// import { EffectComposer, GodRays, Vignette } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils";


export default function ModelViewer({
  cameraPos,
  setCameraPos,
}) {
  return (
    <div className="h-screen w-full relative bg-gradient-to-l from-[#05381D] to-[#145030]">
      <Canvas rotation={[degToRad(0),degToRad(0),degToRad(0)]} camera={{ position: [0, 3, 0], fov: 50 }}>
        <BGParticles />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} />
        <ModelsCircle url="/models/model.glb" />
        {/* <EffectComposer>
          <Vignette offset={0.8} darkness={0.5} eskil={false} />
         
        </EffectComposer> */}
      </Canvas>
    </div>
  );
}

