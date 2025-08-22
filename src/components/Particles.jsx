"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef } from "react";
import { random } from "maath";
// import {
//   Bloom,
//   EffectComposer,
//   GodRays,
//   Vignette,
// } from "@react-three/postprocessing";

function ParticleField({
  count = 5000,
  radius = 4,
  color = "green",
  size = 0.02,
  opacity = 0.5,
  rotationX = 25,
  rotationY = 30,
}) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count), { radius: radius })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / rotationX;
    ref.current.rotation.y -= delta / rotationY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          opacity={opacity}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={false}
          alphaMap={new THREE.TextureLoader().load("/circles.webp")}
          map={new THREE.TextureLoader().load("/circles.webp")}
        />
      </Points>
    </group>
  );
}

function ClusterParticleField({
  count = 500, // number of main particles
  mainRadius = 5, // spread of the main cloud
  subParticleCount = 50, // how many subs around each main
  subParticleRadius = 0.009, // radius of cluster around each main
  color = "darkgreen", // main color
  subColor = "limegreen", // sub cluster color
  mainSize = 0.08,
  subSize = 0.005,
  opacity = 0.3,
  rotationX = 25,
  rotationY = 30,
}) {
  const mainRef = useRef();
  const subRef = useRef();

  // Main particle positions
  const [mainPositions] = useState(() =>
    random.inSphere(new Float32Array(count * 3), { radius: mainRadius })
  );

  // Generate sub-particles around each main
  const [subPositions] = useState(() => {
    const particles = new Float32Array(count * subParticleCount * 3);
    let ptr = 0;
    for (let i = 0; i < count; i++) {
      const x = mainPositions[i * 3];
      const y = mainPositions[i * 3 + 1];
      const z = mainPositions[i * 3 + 2];

      const subs = random.inSphere(new Float32Array(subParticleCount * 3), {
        radius: subParticleRadius,
      });

      for (let j = 0; j < subParticleCount * 3; j += 3) {
        particles[ptr++] = subs[j] + x;
        particles[ptr++] = subs[j + 1] + y;
        particles[ptr++] = subs[j + 2] + z;
      }
    }
    return particles;
  });

  useFrame((_, delta) => {
    mainRef.current.rotation.x -= delta / rotationX;
    mainRef.current.rotation.y -= delta / rotationY;
    subRef.current.rotation.x -= delta / rotationX;
    subRef.current.rotation.y -= delta / rotationY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Main Particles */}
      <Points
        ref={mainRef}
        positions={mainPositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color={color}
          size={mainSize}
          opacity={opacity}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* Sub Particles */}
      <Points
        ref={subRef}
        positions={subPositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          // transparent
          color={subColor}
          size={subSize}
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          vertexColors={false}
          alphaMap={new THREE.TextureLoader().load("/darkCircle.png")}
          map={new THREE.TextureLoader().load("/darkCircle.png")}
        />
      </Points>
    </group>
  );
}

export default function BGParticles() {
  return (
    <group>
      <ParticleField size={0.01} count={5000} color="#6BA32C" opacity={0.5} />
      <ParticleField
        count={4000}
        radius={4.1}
        color="#C0EC82"
        size={0.025}
        opacity={1}
        rotationX={30}
        rotationY={40}
      />
      <ParticleField
        count={3000}
        radius={3.9}
        color="green"
        size={0.01}
        opacity={0.8}
        rotationX={30}
        rotationY={40}
      />
      <ParticleField
        count={1000}
        radius={3.8}
        color="#04390A"
        size={0.02}
        opacity={0.8}
        rotationX={30}
        rotationY={40}
      />
      <ClusterParticleField mainSize={0.15} count={200} subColor="white" />
    </group>
  );
}
