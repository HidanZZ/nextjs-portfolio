import { Box, Flex, Stack, chakra } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import { range } from "lodash-es";
import { wrap } from "popmotion";
import ImageCard from "./ImageCard";
const About = (props) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [next, setNext] = useState(false);
  const [src, setSrc] = useState("https://source.unsplash.com/random");

  useEffect(() => {
    //fetch every 5 seconds a random image
    //loop 5 times and fetch a random image
    // const interval = setInterval(() => {
    //   console.log("fetching");
    //   paginate(1);
    // }, 5000);
    // return () => {
    //   clearInterval(interval);
    // };
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
    setPage([page + newDirection, newDirection]);
  };
  const imageIndex = (page) => wrap(0, srcs.length, page);
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };
  // useEffect(() => {
  //   // paginate every 5 seconds
  //   const interval = setInterval(() => {
  //     paginate(1);
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return (
    <Stack
      {...props}
      minH="100vh"
      w="full"
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        justify={"center"}
        // alignItems={"center"}
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
          color="green"
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
          color="#D6E9E7"
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
          mb={{
            base: 10,
            md: 4,
          }}
          fontSize={{
            base: "lg",
            md: "xl",
          }}
          fontWeight="thin"
          letterSpacing="wider"
        >
          Low-latency voice and video feels like you’re in the same room. Wave
          hello over video, watch friends stream their games, or gather up and
          have a drawing session with screen share.
        </chakra.p>
      </Flex>
      <Flex
        justify={"center"}
        alignItems={"center"}
        minWidth={{ base: "full", lg: "50%" }}
      >
        <Box
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
        </Box>
      </Flex>
    </Stack>
  );
};
export default About;
