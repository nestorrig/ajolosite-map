import { Float, PresentationControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const Logo3d = ({ image }) => {
  const containerRef = useRef(null);

  return (
    <div
      className="relative mx-auto my-4 aspect-square w-full touch-none lg:w-4/5"
      ref={containerRef}
    >
      <Canvas
        eventSource={containerRef}
        camera={{ position: [0, 0, 1] }}
        shadows
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0.5, 5]} intensity={1} />
        <PresentationControls
          snap={true}
          polar={[-Math.PI / 3, Math.PI / 3]}
          config={{ mass: 2, tension: 500 }}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float floatingRange={[-0.05, 0.05]}>
            <LogoObject image={image} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

const LogoObject = ({ image = "/media/logos/Logo=Orizaba.png" }) => {
  const texture = useTexture(image);
  const meshRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      meshRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        duration: 2,
        x: 1,
        y: 1,
        z: 1,
        ease: "power3.out",
      },
    );
  }, [texture]);

  return (
    <mesh position={[0, 0, 0]} ref={meshRef}>
      <planeGeometry args={[1, 1]} scale={[1, 1, 100]} />
      <meshStandardMaterial
        map={texture}
        color={"white"}
        transparent
        opacity={1}
        side={2}
        metalness={0.7}
        roughness={0.4}
      />
    </mesh>
  );
};
