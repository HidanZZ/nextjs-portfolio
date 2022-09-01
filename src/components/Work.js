import {
  Box,
  Stack,
  Flex,
  chakra,
  Image,
  Text,
  Button,
  Container,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { range } from "lodash-es";
import Card from "./Card";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import DevIcon from "devicon-react-svg";
import icons from "../utils/icons";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
const Work = (props) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [cardWrapperRef, inViewCardWrapper] = useInView({
    threshold: 0,
  });
  const [selected, setSelected] = useState(0);
  const [titleRef, inViewTitle] = useInView({
    threshold: 0.1,
  });
  const screens = [
    {
      title: "All",
      color: "white",
    },
    {
      title: "Games",
      color: "white",
    },
    {
      title: "Apps",
      color: "white",
    },
    {
      title: "Web",
      color: "white",
    },
  ];
  const data = {
    Games: [
      {
        title: "Pixel Farm",
        category: "game",
        categoryIndex: 1,
        image: "projects/pixelfarm.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot"],
        links: {
          github: "https://github.com/HidanZZ/Farming-game",
          website: "https://hidanzz.github.io/Farming-game",
        },
      },
      {
        title: "Space Orbit",
        category: "game",
        categoryIndex: 1,
        image: "projects/spaceorbit.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot"],
        links: {
          github: "https://github.com/HidanZZ/space-orbit-godot",
          website: "https://hidanzz.github.io/space-orbit-godot",
        },
      },
      {
        title: "Visual Novel",
        category: "game",
        categoryIndex: 1,
        image: "projects/visualnovel.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot"],
        links: {
          github: "https://github.com/HidanZZ/visual-novel",
        },
      },
      {
        title: "2048",
        category: "game",
        categoryIndex: 1,
        image: "projects/2048.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/2048",
          website: "https://lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Balloon Crush",
        category: "game",
        categoryIndex: 1,
        image: "projects/balloncrush.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/balloon-crush",
          website: "https://balloon-crush--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Basketball",
        category: "game",
        categoryIndex: 1,
        image: "projects/basketthrower.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/basket-thrower",
          website: "https://basket-thrower--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Boxing Arcade",
        category: "game",
        categoryIndex: 1,
        image: "projects/boxing.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/boxing-arcade",
          website: "https://boxing-arcade--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Candy Land",
        category: "game",
        categoryIndex: 1,
        image: "projects/candyland.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/Candy-Land",
          website: "https://candy-land--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Color game",
        category: "game",
        categoryIndex: 1,
        image: "projects/colorgame.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/color-game",
          website: "https://color-game--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Egg Toss",
        category: "game",
        categoryIndex: 1,
        image: "projects/eggtoss.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/egg-toss",
          website: "https://egg-toss--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Escape room",
        category: "game",
        categoryIndex: 1,
        image: "projects/escaperoom.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/Escape-Room",
          website: "https://escape-room--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Gold nuggets",
        category: "game",
        categoryIndex: 1,
        image: "projects/goldnuggetas.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/GoldNuggets",
          website: "https://goldnuggets--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Jumping Bunny",
        category: "game",
        categoryIndex: 1,
        image: "projects/jumpingbunny.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github:
            "https://github.com/HidanZZ/nextjs-portfolio/tree/jumping-bunny",
          website: "https://jumping-bunny--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Timberjack",
        category: "game",
        categoryIndex: 1,
        image: "projects/timberjack.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["javascript"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/Timberjack",
          website: "https://timberjack--lucky-kataifi-02f63d.netlify.app",
        },
      },
    ],
    Apps: [
      {
        title: "Finance App",
        category: "app",
        categoryIndex: 1,
        image: "projects/finance.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["flutter"],
        links: {
          github: "https://github.com/HidanZZ/finance-ui-app",
        },
      },
      {
        title: "AdZone",
        category: "app",
        categoryIndex: 1,
        image: "projects/adzone.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["flutter", "nodeJS", "express"],
        links: {
          github: "https://github.com/ramadanhamza/AdZone-front",
        },
      },
    ],
    Web: [],
  };
  data.All = data.Games.concat(data.Apps, data.Web);
  const tabContentVariant = {
    active: {
      display: "flex",
      transition: {
        staggerChildren: 0.2,
      },
    },
    inactive: {
      display: "none",
    },
  };
  // console.log("data", data[screens[selected].title]);
  return (
    <Box
      backgroundColor={"black"}
      {...props}
      ref={props.innerRef}
      as={motion.div}
      minH="105vh"
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
        Checkout some of My <chakra.span color={"orange"}>Work</chakra.span>
      </chakra.h1>
      <chakra.ol
        listStyleType={"none"}
        p={0}
        m={0}
        userSelect="none"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        as={motion.ol}
        ref={ref}
        initial={{ x: -100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
        }}
        style={{ transform: "translateZ(0)" }}
      >
        {screens.map(({ title, color }, i) => (
          <chakra.li
            as={motion.li}
            listStyleType={"none"}
            p={2}
            m={0}
            userSelect="none"
            fontSize={{ base: "md", md: "lg" }}
            key={i}
            mr={{ base: 3, md: 5 }}
            pos="relative"
            cursor="pointer"
            zIndex={1}
            // style={{ color: i === selected ? color : "" }}
            color={i === selected ? color : "white"}
            onClick={() => setSelected(i)}
          >
            {i === selected && (
              <chakra.div
                as={motion.div}
                w="100%"
                h="100%"
                zIndex={-1}
                borderRadius="4px"
                position="absolute"
                bg={"orange"}
                left={0}
                top={0}
                layoutId="underline"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            {title}
          </chakra.li>
        ))}
      </chakra.ol>

      <Box mb={20} minW="80%" h={"100%"} maxW={"80%"}>
        <Flex
          width={"full"}
          flexGrow={1}
          ref={cardWrapperRef}
          mt={4}
          flexWrap={"wrap"}
          justifyContent="center"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={
            inViewCardWrapper
              ? { opacity: 1, transition: { duration: 1 } }
              : { opacity: 0 }
          }
          variants={tabContentVariant}
        >
          <AnimatePresence>
            <Flex
              as={motion.div}
              variants={tabContentVariant}
              animate={"active"}
              initial="inactive"
              exit={"inactive"}
              flexWrap={"wrap"}
              p={{ base: 4, md: 8 }}
              justifyContent="center"
              key={selected}
            >
              {data[screens[selected].title].map((item, i) => (
                <chakra.span key={i} m={2}>
                  <Card
                    title={item.title}
                    subtitle={item.description}
                    tag={item.category}
                    madeWith={item.madeWith}
                    bgPhoto={item.image}
                    links={item.links}
                  ></Card>
                </chakra.span>
              ))}
            </Flex>
          </AnimatePresence>
        </Flex>
      </Box>
    </Box>
  );
};
export default Work;