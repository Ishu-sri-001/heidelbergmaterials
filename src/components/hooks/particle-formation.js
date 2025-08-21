import { gsap } from "gsap";
import * as THREE from "three";

export function useParticleFormation(pointsRef, targetPositions) {
  const animateToMesh = () => {
    if (!pointsRef.current || !targetPositions) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const material = pointsRef.current.material;
    
    // Set initial opacity to 0
    material.opacity = 0;
    
    // Create scattered positions away from target positions for animation start
    const startPositions = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 3) {
      // Generate random direction vector
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      
      // Scale the direction to create distance from target
      const distance = 2 + Math.random() * 0.1; // Distance between 2-4 units
      direction.multiplyScalar(distance);
      
      // Set start positions away from target
      startPositions[i] = targetPositions[i] + direction.x;
      startPositions[i + 1] = targetPositions[i + 1] + direction.y;
      startPositions[i + 2] = targetPositions[i + 2] + direction.z;
      
      positions[i] = startPositions[i];
      positions[i + 1] = startPositions[i + 1];
      positions[i + 2] = startPositions[i + 2];
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Animate to exact target positions with opacity fade in
    gsap.to(positions, {
      duration: 1.2,
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = THREE.MathUtils.lerp(startPositions[i], targetPositions[i], progress);
          positions[i + 1] = THREE.MathUtils.lerp(startPositions[i + 1], targetPositions[i + 1], progress);
          positions[i + 2] = THREE.MathUtils.lerp(startPositions[i + 2], targetPositions[i + 2], progress);
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });

    gsap.to(material, {
      duration: 1.2,
      opacity: 1,
      ease: "power2.out"
    });
  };

  const disperseParticles = () => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const material = pointsRef.current.material;
    
    // Store initial positions for each particle
    const initialPositions = new Float32Array(positions);
    
    // Calculate end positions that are away from initial positions
    const endPositions = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 3) {
      // Generate random direction vector
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      ).normalize();
      
      // Scale the direction to create distance from initial position
      const distance = 2 + Math.random() * 2; // Distance between 2-4 units
      direction.multiplyScalar(distance);
      
      // Set end positions away from initial positions
      endPositions[i] = initialPositions[i] + direction.x;
      endPositions[i + 1] = initialPositions[i + 1] + direction.y;
      endPositions[i + 2] = initialPositions[i + 2] + direction.z;
    }
    
    gsap.to(positions, {
      duration: 1.2,
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = THREE.MathUtils.lerp(initialPositions[i], endPositions[i], progress);
          positions[i + 1] = THREE.MathUtils.lerp(initialPositions[i + 1], endPositions[i + 1], progress);
          positions[i + 2] = THREE.MathUtils.lerp(initialPositions[i + 2], endPositions[i + 2], progress);
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });

    // Animate opacity from 1 to 0
    gsap.to(material, {
      duration: 1.2,
      opacity: 0,
      ease: "power2.out"
    });
  };

  return { animateToMesh, disperseParticles };
}