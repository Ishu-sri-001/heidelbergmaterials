"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  OrbitControls,
  useGLTF,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { random } from "maath";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { degToRad } from "three/src/math/MathUtils";

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
    const positions = random.inSphere(new Float32Array(count * 3), {
      radius: radius,
    });
    // Validate positions
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    ref.current.rotation.z += delta / rotationX;
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
    const positions = random.inSphere(new Float32Array(count * 3), {
      radius: radius,
    });
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    ref.current.rotation.z += delta / rotationX;
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
    const positions = random.inSphere(new Float32Array(count * 3), {
      radius: mainRadius,
    });
    // Validate positions
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
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
    mainRef.current.rotation.z += delta / rotationX;
    subRef.current.rotation.z += delta / rotationX;
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

export default function BGParticles({ isZoomed }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const groupRef = useRef();
  const handleMouseMove = useCallback((event) => {
    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useFrame(() => {
    if (groupRef.current) {
      // Smoothly move particles based on mouse position
      groupRef.current.rotation.x +=
        (mousePosition.y * 0.01 - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y +=
        (mousePosition.x * 0.01 - groupRef.current.rotation.y) * 0.1;
    }
  });

  // Generate points on a sphere surface
  const spherePoints = useMemo(() => {
    const points = [];
    const count = 1000;
    const radius = 1;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      points.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    }

    return new Float32Array(points);
  }, []);

  return (
    <group rotation={[degToRad(0),degToRad(0),degToRad(0)]}>
      <group ref={groupRef}>
        <ParticleField size={0.01} count={5000} color="#000000" opacity={0.5} />
        <ParticleField
          count={8000}
          radius={4.1}
          color="white"
          size={0.015}
          opacity={1}
          rotationX={80}
          rotationY={40}
        />
        <SmallWhiteParticles
          count={12000}
          radius={3.9}
          size={0.003}
          opacity={0.8}
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

      <group>
        <Points
          position={isZoomed ? [-3.1,-2,-3] : [2.5, -1, 0]}
          positions={spherePoints}
          stride={3}
        >
          <PointMaterial
            transparent
            color="#BBCB79"
            size={0.015}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
        <Points
          scale={isZoomed ? 1 : 0.6}
          position={isZoomed ? [2,1.5,-4] : [-1.8, 0.5, 1]}
          positions={spherePoints}
          stride={3}
        >
          <PointMaterial
            transparent
            color="#BBCB79"
            size={0.01}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
        <Points
          scale={isZoomed ? .8 : 0.6}
          position={isZoomed ? [-4,0.8,-3] : [3, 0.8, 0]}
          positions={spherePoints}
          stride={3}
        >
          <PointMaterial
            transparent
            color="#FFFFFF"
            size={0.01}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>

        <Points
          scale={isZoomed ? 1: 0.6}
          position={isZoomed ? [2.5,-1.5,-4] : [-0.5, -0.8, 1.5]}
          positions={spherePoints}
          stride={3}
        >
          <PointMaterial
            transparent
            color="#0E4B2A"
            size={0.01}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>

        <EffectComposer>
          <DepthOfField
              focusDistance={0.1} // how far things in focus are
              focalLength={0.5} // lens focal length
              bokehScale={1} // intensity of blur
              height={480} // resolution
            />
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.5}
            radius={0.7}
          />

        </EffectComposer>
      </group>
    </group>
  );
}
