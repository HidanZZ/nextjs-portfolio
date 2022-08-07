import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Lottie from "lottie-react";
import scrolldown from "../animations/scroll-down.json";
const ScrollAnimation = () => {
  const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
  });
  const variants = {
    idle: { opacity: 0, scale: 0.5, y: "100%", x: "-50%" },
    animate: {
      opacity: 1,
      scale: 2,
      y: "0%",
      x: "-50%",
      transition: { duration: 1.725 },
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
      display={{ base: "none", md: "block" }}
      initial={"idle"}
      animate={"animate"}
      variants={variants}
    >
      <Lottie
        // style={{ transform: "translate(-25%,0%)" }}
        animationData={scrolldown}
        loop={true}
      />
    </ChakraBox>
  );
};
export default ScrollAnimation;
