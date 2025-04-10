import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Map = (props) => {
  const { nodes } = useGLTF("./gl/models/mexico.glb");
  const meshesRef = useRef([]);

  return (
    <>
      <group {...props} dispose={null} rotation={[-Math.PI / 2, 0, 0]}>
        <group
          position={[-2.45, 1.5, 0]}
          rotation={[Math.PI, 0, 0]}
          scale={[0.006, 0.006, 0.05]}
        >
          {Object.keys(nodes).map((key, index) => {
            const node = nodes[key];
            if (node.type !== "Mesh") return null;

            return (
              <mesh
                key={key}
                ref={(el) => (meshesRef.current[index] = el)} // Asignar referencia al array
                geometry={node.geometry} // Asignar la geometría del nodo
                material={node.material} // Asignar el material del nodo
                material-color={node.material.color} // Asignar el color del material
              ></mesh>
            );
          })}
        </group>
      </group>
    </>
  );
};

useGLTF.preload("./gl/models/mexico.glb");
