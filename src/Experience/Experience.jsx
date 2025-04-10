import { Canvas } from "@react-three/fiber";
import { Map } from "./Map";
import { Controls } from "./Controls";
import { Locations } from "./Locations";
import { Stats } from "@react-three/drei";
import { InfoModal } from "../components/InfoModal";

export const Experience = () => {
  return (
    <div className="container-webgl fixed inset-0">
      <Canvas
        // eventSource={containerRef}
        shadows
        className="fixed top-0 left-0 h-full w-full"
      >
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[10, 2, 30]} intensity={1} />
        <Controls />
        <Map />
        <Locations />
        {/* <Stats /> */}
      </Canvas>
      <InfoModal />
    </div>
  );
};
