import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const Sea = () => {
  const shaderMaterialRef = useRef();
  const noiseTexture = useLoader(
    THREE.TextureLoader,
    "/gl/textures/perlin.png",
  ); // Carga la textura de ruido

  // Configurar la textura de ruido
  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;

  // Actualizar los uniformes dinámicos en cada frame
  useFrame(({ clock, size }) => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.u_time.value = clock.getElapsedTime();
      shaderMaterialRef.current.uniforms.u_resolution.value = new THREE.Vector2(
        size.width,
        size.height,
      );
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[16, 9]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0, 0) },
          u_resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          u_noiseTexture: { value: noiseTexture }, // Uniforme para la textura de ruido
        }}
        vertexShader={`
          varying vec2 v_uv;

          void main() {
            v_uv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;

          uniform float u_time;
          uniform vec2 u_mouse;
          uniform vec2 u_resolution;
          uniform sampler2D u_noiseTexture;
          varying vec2 v_uv;

          void main() {
              vec2 uv = v_uv;

              // Ajustar la relación de aspecto
              float aspect = u_resolution.x / u_resolution.y;
              uv.x *= aspect;

              // Distorsión basada en la textura de ruido
              vec2 noiseUv = uv * 4.0 + u_time * 0.1;
              vec2 distortion = texture2D(u_noiseTexture, noiseUv).rg * 0.1;

              // Aplicar distorsión
              vec2 waterUv = uv + distortion;

              // Altura de las ondas
              float waveHeight = texture2D(u_noiseTexture, waterUv * 2.0).r;

              // Colores del agua
              vec3 deepColor = vec3(0.0, 0.05, 0.2);
              vec3 midColor = vec3(0.0, 0.3, 0.5);
              vec3 surfaceColor = vec3(0.1, 0.5, 0.8);

              // Mezclar colores según la altura de las ondas
              vec3 color = mix(deepColor, midColor, waveHeight);
              color = mix(color, surfaceColor, waveHeight * 0.5);

              // Efecto de mouse
              float mouseDistance = length(uv - u_mouse);
              float ripple = sin(mouseDistance * 40.0 - u_time * 5.0) * 0.5 + 0.5;
              ripple *= smoothstep(0.5, 0.0, mouseDistance);
              color += ripple * 0.1;

              // Vignette
              float vignette = 1.0 - smoothstep(0.5, 1.5, length(v_uv - 0.5) * 2.0);
              color *= vignette * 1.2;

              gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};
