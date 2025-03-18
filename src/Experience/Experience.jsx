import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const Experience = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={Math.PI / 2} />
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <Box args={[1, 1, 1]} position-x={-2}>
        <meshStandardMaterial color="orange" />
      </Box>
    </Canvas>
  );
};
