import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Box, chakra, Flex, Image } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Vibrant from "node-vibrant";
import { iconsWithNames } from "../utils/icons";
const Skills = ({ innerRef, mt }) => {
  const [titleRef, inViewTitle] = useInView({
    threshold: 0.1,
  });
  const [subtitleRef, inViewSub] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <Box
      backgroundColor={"black"}
      ref={innerRef}
      mt={mt}
      as={motion.div}
      minH="100vh"
      w="full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      p={4}
      pt={20}
    >
      <chakra.h1
        ref={titleRef}
        as={motion.div}
        initial={{ opacity: 0, x: -100 }}
        animate={inViewTitle ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        mt={8}
        fontSize={{
          base: "3xl",
          md: "5xl",
        }}
        fontWeight="bold"
        lineHeight={{
          base: "shorter",
          md: "none",
        }}
        letterSpacing={{
          base: "normal",
          md: "tight",
        }}
        color="white"
        mb={8}
        textAlign="center"
      >
        Skills <chakra.span color={"orange"}>&</chakra.span> Frameworks
      </chakra.h1>

      <Grid></Grid>
      <chakra.h1
        ref={subtitleRef}
        as={motion.div}
        initial={{ opacity: 0, y: 100 }}
        animate={inViewSub ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        mt={8}
        fontSize={{
          base: "1xl",
          md: "3xl",
        }}
        fontWeight="bold"
        lineHeight={{
          base: "shorter",
          md: "none",
        }}
        letterSpacing={{
          base: "normal",
          md: "tight",
        }}
        color="white"
        mb={8}
        textAlign="center"
      >
        And <chakra.span color={"orange"}>Many</chakra.span> More ...
      </chakra.h1>
    </Box>
  );
};

function Grid({ delayPerPixel = 0.0016 }) {
  const originOffset = useRef({ top: 0, left: 0 });
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      p={8}
      mt={8}
      maxW={{ base: "full", md: "70%", lg: "50%" }}
      as={motion.div}
      display="flex"
      justifyContent={"center"}
      flexWrap={"wrap"}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{}}
    >
      {Object.entries(iconsWithNames).map(([key, value], i) => (
        <GridItem
          icon={value.icon}
          title={value.name}
          key={i}
          i={i}
          url={value.url}
          originIndex={0}
          delayPerPixel={delayPerPixel}
          originOffset={originOffset}
        />
      ))}
    </Box>
  );
}

function GridItem({
  icon,
  url,
  title,
  delayPerPixel,
  i,
  originIndex,
  originOffset,
}) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();
  const [hover, setHover] = useState(false);
  // The measurement for all elements happens in the layoutEffect cycle
  // This ensures that when we calculate distance in the effect cycle
  // all elements have already been measured
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [delayPerPixel]);
  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [delayPerPixel]);
  //   console.log(title);
  return (
    <Box
      cursor={"pointer"}
      as={motion.a}
      href={url}
      target="_blank"
      m={"10px"}
      initial={{ scale: 1 }}
      onHoverStart={() => {
        setHover(true);
      }}
      onHoverEnd={() => {
        setHover(false);
      }}
      animate={hover ? { scale: 1.1 } : { scale: 1 }}
      display="inline-block"
      ref={ref}
      variants={itemVariants}
      custom={delayRef}
      textAlign="center"
    >
      <Box
        pos={"relative"}
        borderRadius={"50%"}
        w={"80px"}
        h="80px"
        bg={"white"}
        mb={2}
      >
        <Box
          pos={"absolute"}
          left={0}
          top={0}
          borderRadius={"50%"}
          w={"100%"}
          h={"100%"}
          bg={"blackAlpha.100"}
        ></Box>
        <Image
          pos={"absolute"}
          p={4}
          src={icon}
          alt={""}
          w="full"
          h={"full"}
          objectFit={"contain"}
        />
      </Box>
      <chakra.span
        fontWeight={200}
        fontSize={"md"}
        letterSpacing={1}
        userSelect={"none"}
      >
        {title}
      </chakra.span>
    </Box>
  );
}

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 1,
  },
  visible: (delayRef) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current },
  }),
};

//extract dominant color from image
async function getDominantColor(url) {
  const v = await Vibrant.from(url).getPalette();
  return v.Vibrant.getHex();
}
//hex to rgba
function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

export default Skills;
