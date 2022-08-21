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
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["phaser", "nodeJS"],
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot"],
      },
      {
        title: "test",
        category: "game",
        categoryIndex: 1,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["godot", "nodeJS"],
      },
    ],
    Apps: [
      {
        title: "AdZone",
        category: "app",
        categoryIndex: 2,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["flutter", "nodeJS"],
      },
    ],
    Web: [
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["react", "nodeJS"],
      },
      {
        title: "test",
        category: "web",
        categoryIndex: 3,
        image:
          "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem",
        madeWith: ["react", "nodeJS", "nextJS"],
      },
    ],
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
                    bgPhoto={`https://source.unsplash.com/random/?nature&${i}`}
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
