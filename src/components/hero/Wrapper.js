import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Background } from "./Background";
import { Effects } from "./Effects";
import { Stars } from "./Stars";
import { Text } from "./Text";

export default function HeroCanvas({ tier, isMobile, size, scrollY, top }) {
  const getIndex = (i) => {
    return i % placeHolders.length;
  };
  const [textIndex, setTextIndex] = useState(0);
  const placeHolders = [
    { text: "Hello", fontSize: { md: 200, sm: 100 } },
    { text: "I'm Hidanz", fontSize: { md: 150, sm: 85 } },
    { text: "Multi Talented Developer", fontSize: { md: 100, sm: 50 } },
    { text: "check out my work", fontSize: { md: 110, sm: 60 } },
  ];
  return (
    <Canvas style={{ position: "fixed", top: "0", left: "0" }}>
      <Background
        color={top.to(
          [0, size.height * 2, size.height * 5, size.height * 10],
          ["#191919", "#005B9F", "#191919", "#191919"]
        )}
      />

      <Effects
        onFinish={() => {
          setTextIndex((prev) => prev + 1);
        }}
        scrollY={scrollY}
        height={size.height}
      />

      <Stars
        isMobile={isMobile}
        tier={tier}
        position={top.to((top) => [0, -1 + top / 20, 0])}
      />
      <Text
        fontSize={
          size.width > 768
            ? placeHolders[getIndex(textIndex)].fontSize.md
            : placeHolders[getIndex(textIndex)].fontSize.sm
        }
        opacity={top.to([0, size.height / 2.5], [1, 0])}
        position={top.to((top) => [0, -1 + top / 130, 0])}
      >
        {placeHolders[getIndex(textIndex)].text}
      </Text>
    </Canvas>
  );
}
