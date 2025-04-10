import {
  MapControls,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useMap } from "../hooks/useMap";
import gsap from "gsap";
import { throttle } from "lodash";
import { userGroups } from "../constants/userGroups";

const minX = -2.5;
const maxX = 2;
const minZ = -2;
const maxZ = 2;

export const Controls = () => {
  const { camera } = useThree();
  const { setYPositionCamera, isModalOpen, groupData } = useMap();
  const mapControlsRef = useRef();

  const updateYPositionCamera = throttle((y) => {
    setYPositionCamera(y);
  }, 100);

  useEffect(() => {
    camera.position.set(0, 2, 0);
  }, []);

  useEffect(() => {
    if (!mapControlsRef.current) return;
    if (isModalOpen) {
      mapControlsRef.current.enabled = false;
      const xDistance =
        window.innerWidth > 768
          ? window.innerWidth * 0.0001
          : window.innerWidth * 0.000045;
      const yDistance =
        window.innerWidth > 768 ? 0 : window.innerHeight * 0.00019;

      gsap.to(camera.position, {
        duration: 2,
        x: userGroups[groupData].coordinates[0] + xDistance,
        y: userGroups[groupData].coordinates[1],
        z: userGroups[groupData].coordinates[2] + yDistance,
        ease: "power3.out",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
      gsap.to(mapControlsRef.current.target, {
        duration: 2,
        x: userGroups[groupData].coordinates[0] + xDistance,
        y: userGroups[groupData].coordinates[1],
        z: userGroups[groupData].coordinates[2] + yDistance,
        ease: "power3.out",
        onComplete: () => {
          mapControlsRef.current.enabled = true;
        },
        onUpdate: () => {
          mapControlsRef.current.update();
        },
      });
    } else {
      if (window.innerWidth > 768) return;
      mapControlsRef.current.enabled = false;
      gsap.to(camera.position, {
        duration: 1.5,
        x: 0,
        y: 2,
        z: 0,
        ease: "power3.out",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
      gsap.to(mapControlsRef.current.target, {
        duration: 1.5,
        x: 0,
        y: 0,
        z: 0,
        ease: "power3.out",
        onComplete: () => {
          mapControlsRef.current.enabled = true;
        },
        onUpdate: () => {
          mapControlsRef.current.update();
        },
      });
    }
  }, [isModalOpen, groupData]);

  useFrame(() => {
    if (!camera) return;
    if (mapControlsRef.current) {
      const controls = mapControlsRef.current;
      const target = controls.target; // Punto al que la cámara mira
      let shallWeUpdateAngle = false;

      // Limitar el target para restringir el pan
      if (target.x < minX || target.x > maxX) {
        target.x = target.x < minX ? minX : maxX;
        shallWeUpdateAngle = true;
      }
      if (target.z < minZ || target.z > maxZ) {
        target.z = target.z < minZ ? minZ : maxZ;
        shallWeUpdateAngle = true;
      }

      // Si el target se ajustó, actualizar la posición de la cámara
      if (shallWeUpdateAngle) {
        const distance = camera.position.distanceTo(controls.target);
        camera.position.set(
          distance *
            Math.sin(controls.getPolarAngle()) *
            Math.sin(controls.getAzimuthalAngle()) +
            controls.target.x,
          distance * Math.cos(controls.getPolarAngle()) + controls.target.y,
          distance *
            Math.sin(controls.getPolarAngle()) *
            Math.cos(controls.getAzimuthalAngle()) +
            controls.target.z,
        );
      }

      // Actualizar la posición Y de la cámara usando debounce
      updateYPositionCamera(camera.position.y);

      controls.update();
    }
  });

  return (
    <>
      <OrbitControls
        ref={mapControlsRef}
        camera={null}
        minDistance={0.2}
        maxDistance={3}
        enableDamping={false}
        dampingFactor={0.05}
        enableRotate={false}
        zoomSpeed={0.7}
        screenSpacePanning={true}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
      />
    </>
  );
};
