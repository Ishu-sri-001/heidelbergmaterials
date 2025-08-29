"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useMemo } from "react";
import { random } from "maath";

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
  
  // Use useMemo to ensure sphere data is valid and cached
  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius: radius });
    // Validate positions
    for(let i = 0; i < positions.length; i++) {
      if(isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  }, [count, radius]);

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
        />
      </Points>
    </group>
  );
}

function SmallWhiteParticles({
  count = 10000,
  radius = 4,
  size = 0.005,
  opacity = 0.3,
  rotationX = 35,
  rotationY = 40,
}) {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius: radius });
    for(let i = 0; i < positions.length; i++) {
      if(isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / rotationX;
    ref.current.rotation.y -= delta / rotationY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="white"
          size={size}
          opacity={opacity}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={false}
        />
      </Points>
    </group>
  );
}

function ClusterParticleField({
  count = 500,
  mainRadius = 5,
  subParticleCount = 50,
  subParticleRadius = 0.009,
  color = "darkgreen",
  subColor = "limegreen",
  mainSize = 0.08,
  subSize = 0.005,
  opacity = 0.3,
  rotationX = 25,
  rotationY = 30,
}) {
  const mainRef = useRef();
  const subRef = useRef();

  // Use useMemo for main positions
  const mainPositions = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius: mainRadius });
    // Validate positions
    for(let i = 0; i < positions.length; i++) {
      if(isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  }, [count, mainRadius]);

  // Generate sub-particles with validation
  const subPositions = useMemo(() => {
    const particles = new Float32Array(count * subParticleCount * 3);
    let ptr = 0;
    
    for (let i = 0; i < count; i++) {
      const x = mainPositions[i * 3] || 0;
      const y = mainPositions[i * 3 + 1] || 0;
      const z = mainPositions[i * 3 + 2] || 0;

      const subs = random.inSphere(new Float32Array(subParticleCount * 3), {
        radius: subParticleRadius,
      });

      for (let j = 0; j < subParticleCount * 3; j += 3) {
        particles[ptr++] = (subs[j] || 0) + x;
        particles[ptr++] = (subs[j + 1] || 0) + y;
        particles[ptr++] = (subs[j + 2] || 0) + z;
      }
    }
    return particles;
  }, [count, subParticleCount, subParticleRadius, mainPositions]);

  useFrame((_, delta) => {
    mainRef.current.rotation.x -= delta / rotationX;
    mainRef.current.rotation.y -= delta / rotationY;
    subRef.current.rotation.x -= delta / rotationX;
    subRef.current.rotation.y -= delta / rotationY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
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

      <Points
        ref={subRef}
        positions={subPositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color={subColor}
          size={subSize}
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          vertexColors={false}
        />
      </Points>
    </group>
  );
}

export default function BGParticles() {
  return (
    <group>
      <ParticleField size={0.01} count={5000} color="#000000" opacity={0.5} />
      <ParticleField
        count={8000}
        radius={4.1}
        color="#C0EC82"
        size={0.015}
        opacity={1}
        rotationX={80}
        rotationY={40}
      />
      <SmallWhiteParticles
        count={12000}
        radius={3.9}
        size={0.003}
        opacity={.8}
        
      />
      <ParticleField
        count={5000}
        radius={3.8}
        color="#04390A"
        size={0.02}
        opacity={0.8}
        rotationX={30}
        rotationY={40}
      />
      <ClusterParticleField mainSize={0.15} count={80} subColor="white" />
    </group>
  );
}
