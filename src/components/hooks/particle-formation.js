import { gsap } from "gsap";
import * as THREE from "three";
import { useEffect, useState } from "react";

// Global controls manager
let globalControlsContainer = null;
let controlsCounter = 0;

function createControlsContainer() {
  if (!globalControlsContainer) {
    globalControlsContainer = document.createElement('div');
    globalControlsContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(globalControlsContainer);
  }
  return globalControlsContainer;
}

function createControlButtons(id, label, animateToMesh, disperseParticles) {
  const container = createControlsContainer();
  
  const buttonGroup = document.createElement('div');
  buttonGroup.id = `controls-${id}`;
  buttonGroup.style.cssText = `
    display: flex;
    gap: 8px;
    flex-direction: row;
    pointer-events: auto;
  `;
  
  const formButton = document.createElement('button');
  formButton.textContent = `Form ${label}`;
  formButton.style.cssText = `
    padding: 8px 16px;
    background-color: #00ff88;
    border: none;
    border-radius: 6px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0,255,136,0.3);
    transition: all 0.3s ease;
  `;
  
  const disperseButton = document.createElement('button');
  disperseButton.textContent = `Disperse ${label}`;
  disperseButton.style.cssText = `
    padding: 8px 16px;
    background-color: #ff4757;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(255,71,87,0.3);
    transition: all 0.3s ease;
  `;
  
  // Add hover effects
  formButton.addEventListener('mouseenter', () => {
    formButton.style.backgroundColor = '#00cc6a';
    formButton.style.transform = 'translateY(-1px)';
  });
  
  formButton.addEventListener('mouseleave', () => {
    formButton.style.backgroundColor = '#00ff88';
    formButton.style.transform = 'translateY(0)';
  });
  
  disperseButton.addEventListener('mouseenter', () => {
    disperseButton.style.backgroundColor = '#ff3742';
    disperseButton.style.transform = 'translateY(-1px)';
  });
  
  disperseButton.addEventListener('mouseleave', () => {
    disperseButton.style.backgroundColor = '#ff4757';
    disperseButton.style.transform = 'translateY(0)';
  });
  
  // Add click handlers
  formButton.addEventListener('click', animateToMesh);
  disperseButton.addEventListener('click', disperseParticles);
  
  buttonGroup.appendChild(formButton);
  buttonGroup.appendChild(disperseButton);
  container.appendChild(buttonGroup);
  
  return buttonGroup;
}

function removeControlButtons(id) {
  const buttonGroup = document.getElementById(`controls-${id}`);
  if (buttonGroup) {
    buttonGroup.remove();
  }
  
  // Clean up container if no more controls
  if (globalControlsContainer && globalControlsContainer.children.length === 0) {
    globalControlsContainer.remove();
    globalControlsContainer = null;
  }
}

export function useParticleFormation(pointsRef, targetPositions, options = {}) {
  const { 
    showControls = false, 
    controlLabel = 'Mesh',
    controlId = null 
  } = options;
  
  const [uniqueId] = useState(() => controlId || `particle-${++controlsCounter}`);

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

  // Create and cleanup controls
  useEffect(() => {
    let controlsElement = null;
    
    if (showControls) {
      controlsElement = createControlButtons(uniqueId, controlLabel, animateToMesh, disperseParticles);
    }
    
    return () => {
      if (showControls) {
        removeControlButtons(uniqueId);
      }
    };
  }, [showControls, controlLabel, uniqueId]);

  return { animateToMesh, disperseParticles };
}