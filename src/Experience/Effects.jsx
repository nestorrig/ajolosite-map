import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Vector2 } from "three";
import { useRef, useEffect } from "react";
import {
  RenderPixelatedPass,
  ShaderPass,
  SobelOperatorShader,
} from "three/examples/jsm/Addons.js";

// import {
//   EffectComposer,
//   Pixelation,
//   Scanline,
// } from "@react-three/postprocessing";

extend({
  SobelOperatorShader,
  RenderPass,
  EffectComposer,
});

export const Effects = () => {
  const { camera, gl, scene } = useThree();
  const composer = useRef();

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));

    const effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms["resolution"].value.x =
      window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms["resolution"].value.y =
      window.innerHeight * window.devicePixelRatio;

    const effectPixelation = new RenderPixelatedPass(1, scene, camera);
    effectPixelation.normalEdgeStrength = 2;
    effectPixelation.depthEdgeStrength = 2;
    composer.current.addPass(effectPixelation);
    // composer.current.addPass(effectSobel);
    composer.current.setSize(window.innerWidth, window.innerHeight);
  }, [gl, scene, camera]);

  useFrame(() => {
    composer.current?.render();
  }, 1);

  return null;
};

// export const Effects = () => {
//   return (
//     <EffectComposer>
//       {/* <RenderPass /> */}

//       {/* <shaderPass args={[SobelOperatorShader]} /> */}
//       <Pixelation granularity={0} />
//       <Scanline
//         // blendFunction={BlendFunction.OVERLAY} // blend mode
//         density={50} // scanline density
//       />
//     </EffectComposer>
//   );
// };
