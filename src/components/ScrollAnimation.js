import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Lottie from "lottie-react";
import scrolldown from "../animations/scroll-down.json";
import swipe from "../animations/swipe-up.json";
import { useState, useEffect } from "react";
const ScrollAnimation = () => {
  const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  const [windowSize, setWindowSize] = useState(undefined);
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize(window.innerWidth);
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const variants = {
    idle: { opacity: 0, scale: 0.5, y: "100%", x: "-50%" },
    animate: {
      opacity: 1,
      scale: 2,
      y: "0%",
      x: "-50%",
      transition: { duration: 1.725 },
    },
    swipe: {
      opacity: 1,
      scale: 0.7,
      y: "0%",
      x: "-50%",
    },
  };

  return (
    <ChakraBox
      style={{
        position: "absolute",
        top: "70%",
        left: "50%",

        //
      }}
      // display={{ base: "none", md: "block" }}
      initial={windowSize >= 768 ? "idle" : "swipe"}
      animate={windowSize >= 768 ? "animate" : "swipe"}
      variants={variants}
    >
      <Lottie
        // style={{ transform: "translate(-25%,0%)" }}
        animationData={windowSize >= 768 ? scrolldown : swipe}
        loop={true}
      />
    </ChakraBox>
  );
};

export default ScrollAnimation;
