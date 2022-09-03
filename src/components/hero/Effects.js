import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Glitch } from "../../shaders/Glitch";

export function Effects({ onFinish, scrollY, height }) {
  const [glitchActive, setGlitchActive] = useState(true);

  useFrame(() => {
    if (scrollY.current > height - 100) {
      setGlitchActive(false);
    } else {
      setGlitchActive(true);
    }
  });
  return (
    <EffectComposer>
      {glitchActive && <Glitch onFinish={onFinish} />}
    </EffectComposer>
  );
}
