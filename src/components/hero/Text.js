import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CanvasTexture } from "three/src/Three";
import { a } from "@react-spring/three";

export function Text({
  children,
  position,
  opacity,
  color = "white",
  fontSize = 200,
}) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const isFirefox = typeof InstallTrigger !== "undefined";
    const divider = isFirefox ? 3 : 1;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2048 / divider;
    const context = canvas.getContext("2d");
    context.font = `bold ${fontSize / divider}px Raleway, monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(children, 1024 / divider, (1024 - 410 / 2) / divider);
    return canvas;
  }, [children, fontSize, width, height]);
  let texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  useFrame(() => {
    texture.needsUpdate = true;
  });
  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial
        attach="material"
        map={texture}
        transparent
        opacity={opacity}
      >
        <a.canvasTexture
          attach="map"
          premultiplyAlpha
          image={canvas}
          onUpdate={(s) => {
            s.needsUpdate = true;
          }}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
}
