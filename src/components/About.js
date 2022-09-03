import { Box, Flex, Stack, chakra } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import { range } from "lodash-es";
import { wrap } from "popmotion";
import ImageCard from "./ImageCard";
import Lottie from "lottie-react";
import animationData from "../animations/development.json";
const About = ({ innerRef, mt }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [refText, inViewText] = useInView({
    threshold: 0,
  });
  const [refImage, inViewImage] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const srcs = [
    "https://source.unsplash.com/random/?Programming&1",
    "https://source.unsplash.com/random/?Programming&2",
    "https://source.unsplash.com/random/?Programming&3",
    "https://source.unsplash.com/random/?Programming&4",
    "https://source.unsplash.com/random/?Programming&5",
  ];
  const flyMove = 200;

  const variants = {
    enter: ({ direction, i }) => {
      return {
        x: direction > 0 ? 3 * 60 - 3 : -flyMove,
        scale: direction > 0 ? 0.8 : 0.9,
      };
    },
    center: ({ direction, i, page }) => ({
      zIndex: srcs.length - i,
      x: i * 60 - i * Math.pow(3, 2),
      scale: 1 - 0.1 * i,
    }),
    exit: ({ direction, i }) => {
      return {
        zIndex: srcs.length - i,
        x: direction < 0 ? 3 * 60 - 3 * Math.pow(2, 2) : -flyMove,
        scale: direction < 0 ? 1 - 0.3 : 1,
        opacity: 0,
      };
    },
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage(([page, direction]) => {
      return [page + newDirection, newDirection];
    });
  };
  const imageIndex = (page) => wrap(0, srcs.length, page);
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <Stack
      ref={innerRef}
      mt={mt}
      minH="100vh"
      w="full"
      backgroundColor={"black"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        justify={"center"}
        flex={1}
        flexDirection="column"
        minWidth="50%"
        p={16}
      >
        <chakra.h1
          ref={ref}
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          mb={8}
          fontSize={{
            base: "5xl",
            md: "6xl",
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
          color="orange"
        >
          About
        </chakra.h1>

        <chakra.div
          mb={16}
          fontSize={{
            base: "2xl",
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
          color="lightbeige"
        >
          <Typewriter
            options={{
              strings: ["Web Developer", "Mobile Developer", "Game Developer"],
              autoStart: true,
              loop: true,
              skipAddStyles: true,
            }}
          />
        </chakra.div>
        <chakra.p
          ref={refText}
          as={motion.p}
          initial={{ opacity: 0, x: -50 }}
          animate={inViewText ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          mb={{
            base: 10,
            md: 4,
          }}
          fontSize={{
            base: "lg",
            md: "xl",
          }}
          fontWeight={300}
          letterSpacing="wider"
          color={"lightbeige"}
        >
          I’m Ait daoud El Houssein, a professional and talented Software
          Developer with design skills. I am passionate about leveraging my
          diverse backgrounds to decipher challenging problems and create
          delightful experiences. I honed my skills at Web, Mobile and Game
          development.
          <br />
          <br />I develop websites using MERN stack. I have skills in using
          design softwares like Figma. Being a diligent, hardworking and result
          oriented man, I always work towards achieving best result on each
          project I lay my hands on.
        </chakra.p>
      </Flex>
      <Flex
        justify={"center"}
        alignItems={"center"}
        minWidth={{ base: "full", lg: "50%" }}
        display={{ base: "none", lg: "flex" }}
      >
        <Box
          display="flex"
          width="60%"
          height="60%"
          // bg={"white"}
          ref={refImage}
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={inViewImage ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          borderRadius="10%"
          justifyContent="center"
          alignItems="center"
        >
          <Lottie animationData={animationData} loop={true} />;
        </Box>
        {/* <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          width=" 100%"
          height="100%"
          overflow="hidden"
          pl="15px"
        >
          <AnimatePresence custom={{ direction, page }}>
            {range(3).map((index) => (
              <Box
                as={motion.div}
                key={page + index}
                width="60%"
                height="70%"
                position="absolute"
                // layout
                // layoutId={index + 1}
                drag={index === 0 && "x"}
                dragConstraints={{ right: 0, top: 0, left: 0, bottom: 0 }}
                dragElastic={0.5}
                custom={{ direction, i: index, page }}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween" },
                  scale: { type: "tween", elapsed: 0.1 },
                  zIndex: { delay: direction > 0 ? 0.15 : 0 },
                }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -730) {
                    paginate(1);
                  } else if (
                    swipe > swipeConfidenceThreshold ||
                    offset.x > 730
                  ) {
                    paginate(-1);
                  }
                }}
              >
                <ImageCard
                  image={srcs[imageIndex(page + index)]}
                  index={index}
                />
              </Box>
            ))}
          </AnimatePresence>
        </Box> */}
      </Flex>
    </Stack>
  );
};
export default About;
