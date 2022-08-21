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
                <chakra.span key={i} m={0}>
                  <Card data={item} key={i} />
                </chakra.span>
              ))}
            </Flex>
          </AnimatePresence>
        </Flex>
      </Box>
    </Box>
  );
};

const Card = ({ data, cardKey }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const hoverCardVariants = {
    hover: {
      opacity: 1,
    },
  };
  const cardVariant = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <Flex
      ref={ref}
      userSelect={"none"}
      w="280px"
      m={4}
      bg={"white"}
      key={cardKey}
      as={motion.div}
      variants={cardVariant}
      color={"gray.900"}
      borderRadius={8}
      boxShadow="xl"
      direction="column"
      overflow="hidden"
    >
      <Box pos="relative" p={2} as={motion.div} whileHover="hover">
        <Image
          borderRadius={8}
          w="100%"
          src="https://source.unsplash.com/random/?Programming&5"
          // src={data.image}
        ></Image>
        <Box
          pos="absolute"
          w={"100%"}
          h={"100%"}
          bg="rgba(0,0,0,0.5)"
          top={0}
          left={0}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          as={motion.div}
          initial={{ opacity: 0 }}
          variants={hoverCardVariants}
        >
          <IconButton
            borderRadius={"50%"}
            color="white"
            icon={<ExternalLinkIcon />}
            _hover={{ bg: "orange" }}
          />
        </Box>
      </Box>
      <Box p={3}>
        <Text fontSize="xs" opacity={0.65}>
          {data.category}
        </Text>
        <Text fontSize="sm" fontWeight="600">
          {data.title}
        </Text>
        <Text as={motion.div} fontSize="xs" opacity={0.65} noOfLines={2}>
          {data.description}
        </Text>
      </Box>
      <Flex
        alignItems="center"
        w="100%"
        px={3}
        py={2}
        bg="rgba(0,0,0,.1)"
        borderTop="1px solid rgba(0,0,0,.1)"
      >
        <Box flex="1" fontWeight="600" fontSize="xs" opacity={0.8}>
          <Text>Made with</Text>
          <HStack>
            {data.madeWith.map((item, i) => (
              <Image h="32px" w="32px" src={icons[item]}></Image>
            ))}
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Work;
