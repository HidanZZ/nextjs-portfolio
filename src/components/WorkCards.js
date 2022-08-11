import { Box, Button } from "@chakra-ui/react";
import { range } from "lodash-es";
import { wrap } from "popmotion";

import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
const WorkCards = (props) => {
  const frontRotate = useSpring(0);
  const middleRotate = useTransform(frontRotate, [0, 10], [0, 20]);
  const backRotate = useTransform(middleRotate, [0, 20], [0, 30]);

  // const opacity = useTransform(frontRotate, [0, 10], [1, 0.5]);
  const blur = useTransform(frontRotate, [0, 10], [`blur(0px)`, `blur(20px)`]);

  const frontX = useMotionValue(0);
  const middleX = useSpring(frontX, spring);
  const backX = useSpring(middleX, spring);

  const frontY = useMotionValue(0);
  const middleY = useSpring(frontY, spring);
  const backY = useSpring(middleY, spring);
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
      x: 60 - Math.pow(3, 2),
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
  const onDrag = () => {
    middleY.set(frontY.get() - 60);
    backY.set(middleY.get() - 60);
  };

  const onDragStart = () => {
    frontRotate.set(10);
  };

  const onDragEnd = () => {
    frontRotate.set(0);
  };
  console.log("y", props.y);
  const imageIndex = (page) => wrap(0, srcs.length, page);
  const srcs = [
    "https://source.unsplash.com/random/?Programming&1",
    "https://source.unsplash.com/random/?Programming&2",
    "https://source.unsplash.com/random/?Programming&3",
    "https://source.unsplash.com/random/?Programming&4",
    "https://source.unsplash.com/random/?Programming&5",
  ];
  const style = (i) => {
    switch (i) {
      case 2:
        return {
          ...s.card,
          ...s.back,
          x: backX,
          y: backY,
          rotate: backRotate,
          // opacity,
        };
      case 1:
        return {
          ...s.card,
          ...s.middle,
          x: middleX,
          y: middleY,
          rotate: middleRotate,
          // opacity,
        };
      case 0:
        return {
          ...s.card,
          ...s.front,
          x: frontX,
          y: frontY,
          rotate: frontRotate,
          // opacity,
        };
    }
  };
  return (
    <Box
      // onClick={() => {
      //   paginate(1);
      //   console.log(frontX.get());
      // }}
      {...props}
    >
      <Button
        onClick={() => paginate(-1)}
        position="absolute"
        left="0"
        p={8}
        mb={8}
        bg={"#151f21"}
        color="white"
        fontSize={"2xl"}
        fontWeight={"bold"}
        backgroundColor="green"
        width={{ base: "full", md: "auto" }}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        PREVIOUS
      </Button>
      <Button
        onClick={() => paginate(1)}
        right="0"
        position="absolute"
        p={8}
        mb={8}
        bg={"#151f21"}
        color="white"
        fontSize={"2xl"}
        fontWeight={"bold"}
        backgroundColor="green"
        width={{ base: "full", md: "auto" }}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        NEXT
      </Button>
      <AnimatePresence>
        {range(3).map((i) => (
          <Box
            key={page + i}
            as={motion.div}
            style={style(i)}
            width={{ base: "80%", md: "50%" }}
            height={{ base: "40%", md: "50%" }}
            drag={i === 0}
            onDrag={onDrag}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
            dragElastic={1}
            custom={{ direction, i: i, page }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween" },
              scale: { type: "tween", elapsed: 0.1 },
              zIndex: { delay: direction > 0 ? 0.15 : 0 },
            }}
          >
            <Box
              as={motion.div}
              borderRadius="lg"
              width="100%"
              height="100%"
              overflow="hidden"
            >
              <Box
                as={motion.img}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
                src={srcs[imageIndex(i + page)]}
                draggable={false}
                alt="card"
              />
            </Box>
          </Box>
        ))}
      </AnimatePresence>
    </Box>
  );
};

const spring = { stiffness: 100, damping: 15, mass: 0.2 };

const s = {
  wrap: {
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
    position: "relative",
    display: "flex",
    placeItems: "center",
    justifyContent: "space-between",
  },
  card: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px 0px",

    borderRadius: "1rem",
    background: "#ffffff",
    position: "absolute",
    zIndex: "1",
  },
  front: {
    cursor: "pointer",
  },
  middle: {
    scale: 0.9,
    marginBottom: "60px",
  },
  back: {
    scale: 0.8,
    marginBottom: "120px",
  },
};
export default WorkCards;
