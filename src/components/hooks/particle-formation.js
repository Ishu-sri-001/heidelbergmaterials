import { gsap } from "gsap";
import * as THREE from "three";
import { useEffect, useRef, useCallback } from "react";

export function useParticleFormation(pointsRef, targetPositions, options = {}, toggle) {
  const {
    controlLabel = 'Mesh',
    controlId = null
  } = options;

  // Store the previous toggle state and animation state
  const prevToggleRef = useRef(toggle);
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef(null);

  const animateToMesh = useCallback(() => {
    if (!pointsRef.current || !targetPositions || isAnimatingRef.current) return;
    
    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.killTweensOf(pointsRef.current.geometry.attributes.position.array);
    gsap.killTweensOf(pointsRef.current.material);
    
    isAnimatingRef.current = true;
    const positions = pointsRef.current.geometry.attributes.position.array;
    const material = pointsRef.current.material;

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
      const distance = 2 + Math.random() * 0.1;
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

    // Create timeline for synchronized animations
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        timelineRef.current = null;
      }
    });

    // Animate positions
    tl.to(positions, {
      duration: 1.2,
      ease: "power2.out",
      onUpdate: function () {
        const progress = this.progress();

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = THREE.MathUtils.lerp(startPositions[i], targetPositions[i], progress);
          positions[i + 1] = THREE.MathUtils.lerp(startPositions[i + 1], targetPositions[i + 1], progress);
          positions[i + 2] = THREE.MathUtils.lerp(startPositions[i + 2], targetPositions[i + 2], progress);
        }

        if (pointsRef.current) {
          pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }
    });

    // Animate opacity simultaneously
    tl.fromTo(material, {
      opacity: 0
    }, {
      duration: 1.2,
      opacity: 1,
      ease: "power2.out"
    }, 0); // Start at the same time as position animation

    timelineRef.current = tl;
  }, [targetPositions]);

  const disperseParticles = useCallback(() => {
    if (!pointsRef.current || isAnimatingRef.current) return;
    
    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.killTweensOf(pointsRef.current.geometry.attributes.position.array);
    gsap.killTweensOf(pointsRef.current.material);
    
    isAnimatingRef.current = true;
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
      const distance = 2 + Math.random() * 2;
      direction.multiplyScalar(distance);

      // Set end positions away from initial positions
      endPositions[i] = initialPositions[i] + direction.x;
      endPositions[i + 1] = initialPositions[i + 1] + direction.y;
      endPositions[i + 2] = initialPositions[i + 2] + direction.z;
    }

    // Create timeline for synchronized animations
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        timelineRef.current = null;
      }
    });

    // Animate positions
    tl.to(positions, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function () {
        const progress = this.progress();

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = THREE.MathUtils.lerp(initialPositions[i], endPositions[i], progress);
          positions[i + 1] = THREE.MathUtils.lerp(initialPositions[i + 1], endPositions[i + 1], progress);
          positions[i + 2] = THREE.MathUtils.lerp(initialPositions[i + 2], endPositions[i + 2], progress);
        }

        if (pointsRef.current) {
          pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }
    });

    // Animate opacity simultaneously
    tl.to(material, {
      duration: 2.5,
      opacity: 0,
      ease: "power2.out"
    }, 0); // Start at the same time as position animation

    timelineRef.current = tl;
  }, []);

  useEffect(() => {
    // Only run animation if toggle state changed and pointsRef exists
    if (prevToggleRef.current !== toggle && pointsRef.current && !isAnimatingRef.current && targetPositions) {
      prevToggleRef.current = toggle;
      
      // Add a small delay to ensure state is settled
      const timeout = setTimeout(() => {
        if (toggle) {
          disperseParticles();
        } else {
          animateToMesh();
        }
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [toggle, animateToMesh, disperseParticles, targetPositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (pointsRef.current) {
        gsap.killTweensOf(pointsRef.current.geometry.attributes.position.array);
        gsap.killTweensOf(pointsRef.current.material);
      }
    };
  }, []);

  return { animateToMesh, disperseParticles };
}