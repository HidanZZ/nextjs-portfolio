import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { throttle } from "lodash-es";
import { a } from "@react-spring/three";

import {
  CanvasTexture,
  SphereBufferGeometry,
  MeshBasicMaterial,
} from "three/src/Three";
const degToRad = (deg) => deg * (Math.PI / 180);

export function Stars({ position, isMobile, tier }) {
  let group = useRef();
  let theta = 0;
  const mouse = useRef({ x: 0, y: 0, hasMoved: false });

  useEffect(() => {
    if (!isMobile) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const updMouse = (ev) => {
        mouse.current.x = (ev.clientX / w) * 20 - 10;
        mouse.current.y = (ev.clientY / h) * 20 - 10;
        mouse.current.hasMoved = true;
      };
      const throttled = throttle(updMouse, 60);

      window.addEventListener("mousemove", throttled);
      return () => {
        window.removeEventListener("mousemove", throttled);
      };
    }
  }, []);
  useFrame((state, delta) => {
    const r = 5 * Math.sin(degToRad((theta += 0.02)));
    const s = Math.cos(degToRad(theta * 2));

    group.current.scale.set(s, s, s);
    if (!isMobile) {
      if (!mouse.current.hasMoved) {
        group.current.rotation.set(r, r, r);
      }
      group.current.rotation.x -= mouse.current.y * delta * 0.02;
      group.current.rotation.y -= mouse.current.x * delta * 0.02;
    } else {
      group.current.rotation.set(r, r, r);
    }
  });
  const [geo, mat, coords] = useMemo(() => {
    const geo = new SphereBufferGeometry(1, 10, 10);
    const mat = new MeshBasicMaterial({
      color: "white",
      transparent: true,
    });
    const n = isMobile ? 100 : 300;
    const coords = new Array(tier * n + (tier - 1) * n)
      .fill()
      .map((i) => [
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000,
      ]);

    return [geo, mat, coords];
  }, []);
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  );
}
