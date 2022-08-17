import { useState, useRef } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { wrap } from "popmotion";
import {
  Box,
  Flex,
  Heading,
  Stack,
  chakra,
  Text,
  VStack,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { range } from "lodash-es";
import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from "@chakra-ui/icons";
import Flag from "react-world-flags";

/**
 * Using AnimatePresence and drag for a slideshow and AnimateSharedLayout
 * for a pagination indicator.
 *
 * Add and remove pages from the array to checkout how the gestures
 * and pagination animations are fully data and layout-driven.
 */

// const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const pages = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "lol",
    country: "nor",
    stars: 5,
    url: "https://www.google.com",
  },
];

export default function Testimonials(props) {
  /*
   * We keep track of the pagination direction as well as current page, this way we
   * can dynamically generate different animations depending on the direction of travel
   */
  const [[currentPage, direction], setCurrentPage] = useState([0, 0]);
  const hasPaginated = useRef(false);
  // console.log({ currentPage, direction });

  function setPage(newPage, newDirection) {
    // console.log({ newPage, newDirection, currentPage, direction });
    if (!newDirection) newDirection = newPage - currentPage;
    setCurrentPage([newPage, newDirection]);
  }
  const [titleRef, inViewTitle] = useInView({
    threshold: 0,
  });
  const [controlsRef, inViewControls] = useInView({
    threshold: 1,
  });
  const titleVariants = {
    initial: {
      opacity: 0,
      y: "-100%",
    },
    animate: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      p={10}
      ref={props.innerRef}
      {...props}
      minH="100vh"
      w="full"
      bg="lightbeige"
    >
      <Box
        as={motion.div}
        justifyContent={"center"}
        alignItems={"center"}
        ref={titleRef}
        mt={8}
        animate={inViewTitle ? "animate" : "initial"}
        initial="initial"
        variants={titleVariants}
        spacing={2}
        align={"center"}
      >
        <Heading color="black" fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}>
          Our <chakra.span color={"orange"}>Clients</chakra.span> Speak
        </Heading>
        <Text color="black" textAlign={"center"} fontSize={{ md: "2xl" }}>
          We have been working with clients around the world
        </Text>
      </Box>

      <Container align="center" maxW={"100vw"} py={16} as={Stack} spacing={12}>
        <Slides
          currentPage={currentPage}
          direction={direction}
          setPage={setPage}
          hasPaginated={hasPaginated}
        />
        <Box
          width={"100%"}
          ref={controlsRef}
          as={motion.div}
          justifyContent={"center"}
          alignItems={"center"}
          animate={
            inViewControls ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }
          }
          initial={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        >
          <Pagination currentPage={currentPage} setPage={setPage} />
          <Stack mt={4} direction={"row"} align="center" justify={"center"}>
            <IconButton
              bg={"blue"}
              borderRadius={"50%"}
              _hover={{ bg: "orange" }}
              icon={<ChevronLeftIcon />}
              onClick={() => {
                var newPage = currentPage - 1;
                if (newPage !== currentPage) {
                  hasPaginated.current = true;
                  // Wrap the page index to within the permitted page range
                  newPage = wrap(0, pages.length, newPage);
                  setPage(newPage, -1);
                }
              }}
            />
            <IconButton
              borderRadius={"50%"}
              bg="blue"
              icon={<ChevronRightIcon />}
              _hover={{ bg: "orange" }}
              onClick={() => {
                var newPage = currentPage + 1;
                if (newPage !== currentPage) {
                  hasPaginated.current = true;
                  // Wrap the page index to within the permitted page range
                  newPage = wrap(0, pages.length, newPage);
                  setPage(newPage, 1);
                }
              }}
            />
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
}

/**
 * Variants define visual states that a motion component can be in at any given time.
 * These can be dynamic - here the enter and exit variants are functions that return
 * different values based on the current direction.
 */
const xOffset = 100;
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
  }),
  active: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
  }),
};

function Slides({ currentPage, setPage, direction, hasPaginated }) {
  const detectPaginationGesture = (e, { offset }) => {
    // console.log({ e, offset });

    if (hasPaginated.current) return;
    let newPage = currentPage;
    const threshold = xOffset / 2;

    if (offset.x < -threshold) {
      // If we're dragging left, go forward a page
      newPage = currentPage + 1;
    } else if (offset.x > threshold) {
      // If we're dragging right, go backwards a page
      newPage = currentPage - 1;
    }

    if (newPage !== currentPage) {
      hasPaginated.current = true;
      // Wrap the page index to within the permitted page range
      newPage = wrap(0, pages.length, newPage);
      setPage(newPage, offset.x < 0 ? 1 : -1);
    }
  };
  const [starRef, inViewStar] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const [cardRef, inViewCard] = useInView({
    threshold: 0,
  });
  const starContainer = {
    animate: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };
  return (
    <Box
      ref={cardRef}
      position={"relative"}
      mx={2}
      as={motion.div}
      initial={{ opacity: 0, y: -100, scale: 0.5 }}
      animate={
        inViewCard
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -100, scale: 0.5 }
      }
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      w={{ base: "90vw", sm: "70vw", md: "50vw" }}
      h={"250px"}
    >
      <AnimatePresence
        // Disable entry animations when AnimatePresence mounts, but allow
        // them when new children enter.
        initial={false}
        // This will be used for components to resolve exit variants. It's neccessary
        // as removed components won't rerender with the latest state (as they've been removed)
        custom={direction}
      >
        <Box
          pos="relative"
          boxShadow="lg"
          display={"flex"}
          align="center"
          background={"#fff"}
          rounded="xl"
          justify="center"
          as={motion.div}
          key={currentPage}
          borderRadius="5px"
          position={"absolute"}
          top={"0"}
          left={"0"}
          bottom={"0"}
          right={"0"}
          data-page={currentPage}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          drag="x"
          layout
          onDrag={detectPaginationGesture}
          onDragStart={() => (hasPaginated.current = false)}
          onDragEnd={() => (hasPaginated.current = true)}
          // Snap the component back to the center if it hasn't paginated
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          // This will be used for components to resolve all other variants, in
          // this case initial and animate.
          custom={direction}
          color={"black"}
        >
          <VStack p={{ base: 3, sm: 4, md: 5, lg: 7, xl: 10 }} width="100%">
            <Flex
              w={"100%"}
              direction={"row"}
              mt={2}
              justifyContent={"space-between"}
            >
              <Quote reversed={true} />
              <Quote />
            </Flex>

            <Text
              p={{ base: 2, sm: 4, md: 6 }}
              fontSize="md"
              textAlign="center"
              color="gray.600"
              fontWeight={500}
            >
              {pages[currentPage].quote}
            </Text>
            <Box
              display={"flex"}
              as={motion.div}
              ref={starRef}
              justifyContent={"center"}
              w={"100%"}
              direction={"row"}
              initial={"initial"}
              animate={inViewStar ? "animate" : "initial"}
              variants={starContainer}
            >
              {range(pages[currentPage].stars).map((i) => {
                return <Star key={i} />;
              })}
            </Box>
            <Flex flexDirection={"row"} w="100%" justify="center">
              <Flag
                marginWidth={"5px"}
                code={pages[currentPage].country}
                width="18px"
              />
              <Text cursor={"pointer"} mx={2} fontWeight={500}>
                <a href={pages[currentPage].url}>
                  {pages[currentPage].name} (Fiverr)
                </a>
              </Text>
            </Flex>
          </VStack>
        </Box>
      </AnimatePresence>
    </Box>
  );
}

function Star() {
  const variants = {
    initial: {
      opacity: 0,
      y: "-10px",
    },
    animate: {
      opacity: 1,
      y: "0px",
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };
  return (
    <Box as={motion.div} variants={variants} mx={1}>
      <StarIcon color={"yellow.400"} />
    </Box>
  );
}

function Pagination({ currentPage, setPage }) {
  // Wrap all the pagination dots with AnimateSharedPresence so we can detect
  // when dots with a layoutId are removed/added
  return (
    <AnimateSharedLayout>
      <Box display={"flex"} justifyContent={"center"} mt="30px">
        {pages.map((page, i) => (
          <Dot
            key={i}
            onClick={() => setPage(i)}
            isSelected={i === currentPage}
          />
        ))}
      </Box>
    </AnimateSharedLayout>
  );
}

function Quote({ reversed = false }) {
  const path = reversed
    ? "M3.516 7c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5l-0.016-0.5c0-3.866 3.134-7 7-7v2c-1.336 0-2.591 0.52-3.536 1.464-0.182 0.182-0.348 0.375-0.497 0.578 0.179-0.028 0.362-0.043 0.548-0.043zM12.516 7c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5l-0.016-0.5c0-3.866 3.134-7 7-7v2c-1.336 0-2.591 0.52-3.536 1.464-0.182 0.182-0.348 0.375-0.497 0.578 0.179-0.028 0.362-0.043 0.549-0.043z"
    : "M12.5 10c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5l0.016 0.5c0 3.866-3.134 7-7 7v-2c1.336 0 2.591-0.52 3.536-1.464 0.182-0.182 0.348-0.375 0.497-0.578-0.179 0.028-0.362 0.043-0.549 0.043zM3.5 10c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5l0.016 0.5c0 3.866-3.134 7-7 7v-2c1.336 0 2.591-0.52 3.536-1.464 0.182-0.182 0.348-0.375 0.497-0.578-0.179 0.028-0.362 0.043-0.549 0.043z";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1rem"
      height="1rem"
      fill="#4a5568"
    >
      <motion.path strokeWidth={0} d={path}></motion.path>
    </svg>
  );
}
function Dot({ isSelected, onClick }) {
  return (
    <Box p="10px" cursor={"pointer"} onClick={onClick}>
      <Box
        w="5px"
        h="5px"
        bg={"black"}
        // background="rgba(255, 255, 255, 0.5)"
        borderRadius={"50%"}
        position={"relative"}
      >
        {isSelected && (
          // By setting layoutId, when this component is removed and a new one
          // is added elsewhere, the new component will animate out from the old one.
          <Box
            as={motion.div}
            background={"black"}
            borderRadius={"50%"}
            w="9px"
            h="9px"
            pos={"absolute"}
            top={"-2px"}
            left={"-2px"}
            layoutId="highlight"
          />
        )}
      </Box>
    </Box>
  );
}
