import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function useCursorRepel(pointsRef, strength = 0.5, radius = 0.1) {
    const { mouse, camera } = useThree();
const originalPositions = useRef(null);
const raycaster = useRef(new THREE.Raycaster());
const prevMouse = useRef({ x: 0, y: 0 });
const isMoving = useRef(false);
const stopTime = useRef(0);

  useFrame(() => {
    const points = pointsRef.current;
    if (!points) return;

    const geom = points.geometry;
    const posAttr = geom.attributes.position;

    if (!originalPositions.current) {
      originalPositions.current = posAttr.array.slice();
    }
    const original = originalPositions.current;

    const mouseDelta = Math.abs(mouse.x - prevMouse.current.x) + Math.abs(mouse.y - prevMouse.current.y);
isMoving.current = mouseDelta > 0.001;
prevMouse.current = { x: mouse.x, y: mouse.y };

    // Update raycaster from camera and mouse
    raycaster.current.setFromCamera(mouse, camera);

    // Transform ray into local space of the points object
    const inverseMatrix = new THREE.Matrix4().copy(points.matrixWorld).invert();
    const localRayOrigin = raycaster.current.ray.origin.clone().applyMatrix4(inverseMatrix);
    const localRayDirection = raycaster.current.ray.direction.clone().transformDirection(inverseMatrix).normalize();

    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;

      const px = posAttr.array[i3];
      const py = posAttr.array[i3 + 1];
      const pz = posAttr.array[i3 + 2];

      const ox = original[i3];
      const oy = original[i3 + 1];
      const oz = original[i3 + 2];

      // Vector from ray origin to particle (in local space)
      const toParticle = new THREE.Vector3(px - localRayOrigin.x, py - localRayOrigin.y, pz - localRayOrigin.z);

      // Closest distance from particle to camera ray
      const t = toParticle.dot(localRayDirection);
      const closestPoint = localRayOrigin.clone().add(localRayDirection.clone().multiplyScalar(t));
      const dist = new THREE.Vector3(px, py, pz).distanceTo(closestPoint);

      if (dist < radius && isMoving.current) {
  const force = (1 - dist / radius) * strength;
  posAttr.array[i3] += (px - closestPoint.x) * force;
  posAttr.array[i3 + 1] += (py - closestPoint.y) * force;
  posAttr.array[i3 + 2] += (pz - closestPoint.z) * force;
} else {
  posAttr.array[i3] += (ox - px) * 0.05;
  posAttr.array[i3 + 1] += (oy - py) * 0.05;
  posAttr.array[i3 + 2] += (oz - pz) * 0.05;
}
    }
    posAttr.needsUpdate = true;
  });
}