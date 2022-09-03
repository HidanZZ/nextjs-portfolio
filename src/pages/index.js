import { Box, VStack, chakra, Link, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Work from "../components/Work";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import ContactFormWithSocialButtons from "../components/Contact";
import Skills from "../components/Skills";

import Emitter from "../services/emitter";

import { useSpring } from "@react-spring/three";

import { BsTelegram } from "react-icons/bs";
import { SiFiverr } from "react-icons/si";
import { getGPUTier } from "detect-gpu";
import { useScroll } from "framer-motion";
import HeroCanvas from "../components/hero/Wrapper";

const Home = ({ children }) => {
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const testRef = useRef(null);
  const contactRef = useRef(null);

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

  const [{ top }, set] = useSpring(() => ({ top: 0 }));
  const { scrollY } = useScroll();
  const [tier, setTier] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
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
      console.log("getting tier");
      const res = await getGPUTier();
      if (!active) {
        return;
      }
      setTier(res.tier);
      setIsMobile(res.isMobile);
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
                  color="blue.400"
                  icon={<BsTelegram />}
                  _hover={{
                    bg: "white",
                    color: "blue.400",
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
                  color="green.500"
                  icon={<SiFiverr />}
                  _hover={{
                    bg: "white",
                    color: "green.500",
                  }}
                  isRound
                />
              </Link>
            </chakra.span>
          </VStack>
        </Box>
        <HeroCanvas
          tier={tier}
          isMobile={isMobile}
          scrollY={scrollY}
          size={size}
          top={top}
        ></HeroCanvas>
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
