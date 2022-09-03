// import { useEffect, useState } from "react";
import { Box, VStack, chakra, Link, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Work from "../components/Work";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import ContactFormWithSocialButtons from "../components/Contact";
import Emitter from "../services/emitter";
import Skills from "../components/Skills";
import { EffectComposer } from "@react-three/postprocessing";
import { useThree, Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Glitch } from "../shaders/Glitch";
import * as THREE from "three/src/Three";
import { withExtend, useSpring, a, to } from "@react-spring/three";
import { useScroll } from "framer-motion";
import { throttle } from "lodash-es";
import { getGPUTier } from "detect-gpu";
import { BsTelegram } from "react-icons/bs";
import { Fiverr } from "@styled-icons/simple-icons";

const Home = ({ children }) => {
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const testRef = useRef(null);
  const contactRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const placeHolders = [
    { text: "Hello", fontSize: { md: 200, sm: 100 } },
    { text: "I'm Hidanz", fontSize: { md: 150, sm: 85 } },
    { text: "Multi Talented Developer", fontSize: { md: 100, sm: 50 } },
    { text: "check out my work", fontSize: { md: 110, sm: 60 } },
  ];
  const getIndex = (i) => {
    return i % placeHolders.length;
  };

  Emitter.on("scrollToAbout", () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  Emitter.on("scrollToWorks", () => {
    if (worksRef.current) {
      worksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  Emitter.on("scrollToTestimonials", () => {
    if (testRef.current) {
      testRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }),
    Emitter.on("scrollToContact", () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }),
    Emitter.on("scrollToSkills", () => {
      if (skillsRef.current) {
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }),
    Emitter.on("scrollToTop", () => {
      window.scrollTo(0, 0);
    });
  const confetti = {
    light: {
      primary: "C84B31", // blue.400
      secondary: "ECDBBA", // blue.100
    },
  };
  const [{ top }, set] = useSpring(() => ({ top: 0 }));
  const { scrollY } = useScroll();
  const [tier, setTier] = useState(-1);
  const size = useWindowDimensions();
  useEffect(() => {
    return scrollY.onChange((latest) => {
      set({ top: latest });
    });
  }, []);
  useEffect(() => {
    let active = true;
    getTier();
    return () => {
      active = false;
    };

    async function getTier() {
      const res = await getGPUTier();
      if (!active) {
        return;
      }
      setTier(res.tier);
    }
  }, []);
  return (
    tier > 0 && (
      <div style={{ position: "relative" }}>
        <Box zIndex={9999} position={"fixed"} bottom={0} right={0}>
          <VStack mb={{ base: 3, md: 6, lg: 8 }} mr={{ base: 2, md: 4, lg: 8 }}>
            <chakra.span m={2}>
              <Link target={"_blank"} href="https://t.me/hidanzz">
                <IconButton
                  aria-label="telegram"
                  variant="ghost"
                  size="lg"
                  fontSize="3xl"
                  bg="white"
                  color="gray.700"
                  icon={<BsTelegram />}
                  _hover={{
                    bg: "white",
                    color: "orange",
                  }}
                  isRound
                />
              </Link>
            </chakra.span>
            <chakra.span>
              <Link target={"_blank"} href="https://www.fiverr.com/hidanz">
                <IconButton
                  aria-label="fiverr"
                  variant="ghost"
                  size="lg"
                  fontSize="2xl"
                  p={2}
                  bg="white"
                  color="gray.700"
                  icon={<Fiverr />}
                  _hover={{
                    bg: "white",
                    color: "orange",
                  }}
                  isRound
                />
              </Link>
            </chakra.span>
          </VStack>
        </Box>
        <Canvas style={{ position: "fixed", top: "0", left: "0" }}>
          <Background
            // color={"#191919"}
            color={top.to(
              [0, size.height * 2, size.height * 5],
              ["#191919", "#005B9F", "#191919"]
              // ['#27282F', '#247BA0', '#70C1B3', '#f8f3f1']
            )}
          />

          <Effects
            onFinish={() => {
              setTextIndex((prev) => prev + 1);
            }}
            scrollY={scrollY}
            height={size.height}
          />
          {/* <StarsParticles position={top.to((top) => [0, -1 + top / 20, 0])} /> */}

          <Stars
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
            position={top.to((top) => [0, -1 + top / 200, 0])}
          >
            {placeHolders[getIndex(textIndex)].text}
          </Text>
        </Canvas>
        <Box minH={"100vh"}></Box>
        <About innerRef={aboutRef} mt={{ base: 3, md: 0 }} />
        <Skills innerRef={skillsRef}></Skills>
        <Work innerRef={worksRef} />
        <Testimonials innerRef={testRef} mt={{ base: 3, md: 0 }} />
        <ContactFormWithSocialButtons innerRef={contactRef} mt={4} />
      </div>
    )
  );
};
const Effects = ({ onFinish, scrollY, height }) => {
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
};
function Text({
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
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext("2d");
    context.font = `bold ${fontSize}px Raleway, monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(children, 1024, 1024 - 410 / 2);
    return canvas;
  }, [children, fontSize, width, height]);
  let texture = new THREE.CanvasTexture(canvas);
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
const degToRad = (deg) => deg * (Math.PI / 180);
function Background({ color }) {
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  );
}
function Stars({ position, tier }) {
  let group = useRef();
  let theta = 0;
  const mouse = useRef({ x: 0, y: 0, hasMoved: false });

  useEffect(() => {
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
  }, []);
  useFrame((state, delta) => {
    const r = 5 * Math.sin(degToRad((theta += 0.02)));
    const s = Math.cos(degToRad(theta * 2));

    group.current.scale.set(s, s, s);
    if (!mouse.current.hasMoved) {
      group.current.rotation.set(r, r, r);
    }
    group.current.rotation.x -= mouse.current.y * delta * 0.02;
    group.current.rotation.y -= mouse.current.x * delta * 0.02;
  });
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: "white",
      transparent: true,
    });
    console.log("tier", tier);
    const coords = new Array(tier * 500 + (tier - 1) * 500)
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
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};
export default Home;
