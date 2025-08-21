"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelsCircle from "./ModelsCircle";
import BGParticles from "./Particles";
// import { EffectComposer, GodRays, Vignette } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils";
import { useEffect } from "react";

function Scene({ setCameraPos , cameraPos, cameraRotation, setCameraRotation}) {
  const { camera } = useThree();
  useEffect(() => {
   camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)
  }, [cameraPos]);

  return (
    <>
      <BGParticles />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} />
      <ModelsCircle cameraRotation={cameraRotation} url="/models/model.glb" />
    </>
  );
}

export default function ModelViewer({ cameraPos, setCameraPos , setCameraRotation, cameraRotation, groupRotation, setGroupRotation}) {
  return (
    <div className="h-screen w-full relative bg-gradient-to-l from-[#05381D] to-[#145030]">
      <Canvas camera={{ position: [0, 0, 5],rotation:[0,0,0], fov: 50 }} >
        <Scene cameraPos={cameraPos} setCameraRotation={setCameraRotation} cameraRotation={cameraRotation} setCameraPos={setCameraPos} />
        {/* <OrbitControls /> */}
        {/* <EffectComposer>
          <Vignette offset={0.8} darkness={0.5} eskil={false} />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
}
