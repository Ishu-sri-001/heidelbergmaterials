"use client";

import { Canvas, useThree } from "@react-three/fiber";
import ModelsCircle from "./ModelsCircle";
import BGParticles from "./Particles";
import { Suspense, useEffect, useRef } from "react";
import { EffectComposer, Vignette, GodRays } from "@react-three/postprocessing";
import { DoubleSide, Mesh, Vector3 } from "three";
import { BlendFunction, Resolution, KernelSize } from "postprocessing";
import { degToRad } from "three/src/math/MathUtils";
import { MeshTransmissionMaterial } from "@react-three/drei";

function Scene({
  setCameraPos,
  cameraPos,
  cameraRotation,
  setCameraRotation,
  ActiveProperties,
  SetActiveProperties,
  lightRef,
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
  }, [cameraPos]);

  return (
    <>
      <BGParticles />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} />
      <ModelsCircle
        cameraRotation={cameraRotation}
        url="/models/model.glb"
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
      />
      <mesh
        ref={lightRef}
        rotation={[degToRad(0), degToRad(0), degToRad(-60)]}
        position={[2, 2, -12]}
      >
        <planeGeometry args={[2.5, 35, 100]} />
        <meshBasicMaterial
          side={DoubleSide}
          color={"#fff"}
          opacity={0.0005}
          transparent={true}
        />
      </mesh>
    </>
  );
}

export default function ModelViewer({
  cameraPos,
  setCameraPos,
  setCameraRotation,
  cameraRotation,
  groupRotation,
  setGroupRotation,
  ActiveProperties,
  SetActiveProperties,
}) {
  const lightRef = useRef(null);

  return (
    <div className="h-screen w-full relative bg-gradient-to-l from-[#05381D] to-[#145030]">
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 5], rotation: [0, 0, 0], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Scene
            lightRef={lightRef}
            cameraPos={cameraPos}
            setCameraRotation={setCameraRotation}
            cameraRotation={cameraRotation}
            setCameraPos={setCameraPos}
            ActiveProperties={ActiveProperties}
            SetActiveProperties={SetActiveProperties}
          />
          {/* <EffectComposer>
            {
              lightRef.current &&
              <GodRays
                sun={lightRef.current}
                blendFunction={BlendFunction.LINEAR_DODGE}
                samples={50}
                density={1}
                // How quickly the rays lose intensity (0-1)
                decay={0.97}
                weight={0.9}
                exposure={0.8}
                clampMax={0.9}
                width={Resolution.AUTO_SIZE}
                height={Resolution.AUTO_SIZE}
                kernelSize={KernelSize.HUGE}
                blur={true}
              />
            }
          </EffectComposer> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
