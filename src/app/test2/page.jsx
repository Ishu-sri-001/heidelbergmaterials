"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import React from "react";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { useParticleFormation } from "@/components/hooks/particle-formation";

function MeshFromModel({ url, meshName, scale = 1, visible = true }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  const mesh = useMemo(() => {
    let foundMesh = null;
    scene.traverse((child) => {
      if (child.isMesh && child.name === meshName) {
        foundMesh = child.clone();
      }
    });

    if (foundMesh) {
      foundMesh.geometry = foundMesh.geometry.clone();
      foundMesh.geometry.scale(scale, scale, scale);
    }

    return foundMesh;
  }, [scene, meshName, scale]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  if (!mesh) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={mesh.geometry}
      visible={visible}
    >
      <meshBasicMaterial color="blue" wireframe />
    </mesh>
  );
}

function AnimatedParticleFromModel({ url, meshName, scale = 1, onAnimationReady }) {
  const { scene } = useGLTF(url);
  const pointsRef = useRef();

  const { particleGeometry, targetPositions } = useMemo(() => {
    let mesh = null;
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("Mesh found:", child.name);
        if (child.name === meshName) mesh = child;
      }
    });

    if (!mesh) {
      console.warn(`Mesh with name "${meshName}" not found.`);
      return { particleGeometry: null, targetPositions: null };
    }

    const cloned = mesh.clone();
    cloned.geometry = cloned.geometry.clone();
    cloned.geometry.scale(scale, scale, scale);

    const sampler = new MeshSurfaceSampler(cloned).build();
    const numParticles = 3000;
    const positions = new Float32Array(numParticles * 3);
    const tempPos = new THREE.Vector3();

    for (let i = 0; i < numParticles; i++) {
      sampler.sample(tempPos);
      positions.set([tempPos.x, tempPos.y, tempPos.z], i * 3);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    return { 
      particleGeometry: geom, 
      targetPositions: new Float32Array(positions) 
    };
  }, [scene, meshName, scale]);

  const { animateToMesh, disperseParticles } = useParticleFormation(pointsRef, targetPositions);

  // Pass animation functions to parent component
  useMemo(() => {
    if (onAnimationReady) {
      onAnimationReady({ animateToMesh, disperseParticles });
    }
  }, [animateToMesh, disperseParticles, onAnimationReady]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
    }
  });

  if (!particleGeometry) return null;

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <pointsMaterial 
        color="#ffffff" 
        size={0.03} 
        sizeAttenuation 
        transparent 
        opacity={0.8}
      />
    </points>
  );
}

// Control buttons component
function Controls({ animationFunctions }) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px',
      flexDirection: 'column'
    }}>
      <button
        onClick={() => animationFunctions?.animateToMesh?.()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#00ff88',
          border: 'none',
          borderRadius: '8px',
          color: 'black',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 4px 8px rgba(0,255,136,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#00cc6a';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#00ff88';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Form Mesh
      </button>
      
      <button
        onClick={() => animationFunctions?.disperseParticles?.()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#ff4757',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 4px 8px rgba(255,71,87,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#ff3742';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#ff4757';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Disperse
      </button>
    </div>
  );
}

export default function ParticleCanvas({ url = "/models/model.glb", meshName = "Chain", scale = 2 }) {
  const [animationFunctions, setAnimationFunctions] = React.useState(null);

  const handleAnimationReady = (functions) => {
    setAnimationFunctions(functions);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Controls animationFunctions={animationFunctions} />
      <Canvas
        camera={{ position: [0, 0, 4] }}
        style={{ 
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)', 
          width: "100vw", 
          height: "100vh" 
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff4757" />
        
        {/* Separate mesh component */}
        <MeshFromModel 
          url={url} 
          meshName={meshName} 
          scale={scale} 
          visible={false} 
        />
        
        {/* Animated particles */}
        <AnimatedParticleFromModel 
          url={url} 
          meshName={meshName} 
          scale={scale}
          onAnimationReady={handleAnimationReady}
        />
      </Canvas>
    </div>
  );
}