import { Box, Flex, chakra } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
const Work = ({ innerRef }) => {
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
          "Farming game where you can buy crops, grow them and sell them for money",
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
          "Don't let the asteroids hit you! Dodge them and collect the coins",
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
          "Visual Novel Test game where you can choose your own path and make your own story",
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
          "clone of the popular 2048 game, where you have to combine the tiles to get the 2048 tile",
        madeWith: ["javascript"],
        links: {
          website: "https://lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Balloon Crush",
        category: "game",
        categoryIndex: 1,
        image: "projects/balloncrush.png",
        description:
          "Match 3 or more balloons of the same color to pop them and get points",
        madeWith: ["javascript"],
        links: {
          website: "https://balloon-crush--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Basketball",
        category: "game",
        categoryIndex: 1,
        image: "projects/basketthrower.png",
        description: "Throw the ball into the basket and get points",
        madeWith: ["javascript"],
        links: {
          website: "https://basket-thrower--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Boxing Arcade",
        category: "game",
        categoryIndex: 1,
        image: "projects/boxing.png",
        description:
          "Hit the punching bag as many times as you can with perfect precision",
        madeWith: ["javascript"],
        links: {
          website: "https://boxing-arcade--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Candy Land",
        category: "game",
        categoryIndex: 1,
        image: "projects/candyland.png",
        description:
          "Clone of the popular Candy Crush game, where you have to match 3 or more candies of the same color to pop them",
        madeWith: ["javascript"],
        links: {
          website: "https://candy-land--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Color game",
        category: "game",
        categoryIndex: 1,
        image: "projects/colorgame.png",
        description: "Find the unmatched color from the given colors",
        madeWith: ["javascript"],
        links: {
          website: "https://color-game--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Egg Toss",
        category: "game",
        categoryIndex: 1,
        image: "projects/eggtoss.png",
        description: "Toss the eggs into the basket and get points",
        madeWith: ["javascript"],
        links: {
          website: "https://egg-toss--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Escape room",
        category: "game",
        categoryIndex: 1,
        image: "projects/escaperoom.png",
        description:
          "Dodge the closing platforms to survive and advance to the next level",
        madeWith: ["javascript"],
        links: {
          website: "https://escape-room--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Gold nuggets",
        category: "game",
        categoryIndex: 1,
        image: "projects/goldnuggetas.png",
        description: "Catch the gold nuggets and avoid the black rocks",
        madeWith: ["javascript"],
        links: {
          website: "https://goldnuggets--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Jumping Bunny",
        category: "game",
        categoryIndex: 1,
        image: "projects/jumpingbunny.png",
        description: "Jump over the obstacles and get points",
        madeWith: ["javascript"],
        links: {
          website: "https://jumping-bunny--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Timberjack",
        category: "game",
        categoryIndex: 1,
        image: "projects/timberjack.png",
        description:
          "Clone of the popular Timberman game, where you have to cut the trees to get points",
        madeWith: ["javascript"],
        links: {
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
          "User Interface for a finance app, where you can add your expenses and income",
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
          "Adzone is an augmented reality application that aims to give life advertisements in a way that benefits both the user and the advertiser",
        madeWith: ["flutter", "nodeJS", "express"],
        links: {
          github: "https://github.com/ramadanhamza/AdZone-front",
        },
      },
      {
        title: "Alertini",
        category: "app",
        categoryIndex: 1,
        image: "projects/alertini.jpg",
        description:
          "Alertini is a mobile application that allows you to create alerts for your favorite products and get notified when they are on sale",
        madeWith: ["react"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/Alertini",
        },
      },
      {
        title: "Quick Math",
        category: "app",
        categoryIndex: 1,
        image: "projects/quickmath.png",
        description:
          "Quick Math is a mobile application that allows you to scan a math problem and get the solution instantly",
        madeWith: ["react"],
        links: {
          github: "https://github.com/HidanZZ/nextjs-portfolio/tree/QuickMath",
        },
      },
    ],
    Web: [
      {
        title: "Circuit lab app",
        category: "web",
        categoryIndex: 1,
        image: "projects/circuitlab.png",
        description:
          "Circuit lab is a web application that allows you to create circuits and export them ",
        madeWith: ["react"],
        links: {
          website: "https://circuit-lab--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Chains Chart landing page",
        category: "web",
        categoryIndex: 1,
        image: "projects/chainschartlanding.png",
        description: "Landing page for a crypto currency trading platform",
        madeWith: ["react"],
        links: {
          website: "https://chains-chart--lucky-kataifi-02f63d.netlify.app",
        },
      },
      {
        title: "Crypto landing page",
        category: "web",
        categoryIndex: 1,
        image: "projects/cryptolanding2.png",
        description: "Landing page for a crypto currency trading platform",
        madeWith: ["html", "css"],
        links: {
          website: "https://stupendous-sfogliatella-9b9fd3.netlify.app",
        },
      },
      {
        title: "Startup landing ",
        category: "web",
        categoryIndex: 1,
        image: "projects/cryptolanding1.png",
        description:
          "Landing page for a Startup company that aims to help people to start their own business",
        madeWith: ["react", "nextJS"],
        links: {
          website: "https://startup-landing-five.vercel.app",
        },
      },
      {
        title: "Chains chart app",
        category: "web",
        categoryIndex: 1,
        image: "projects/chainschartapp.png",
        description:
          "Chains chart is a web application that allows you to create charts and analyze the crypto market",
        madeWith: ["react", "nodeJS"],
        links: {
          website: "https://chains-chart-app--lucky-kataifi-02f63d.netlify.app",
        },
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
  return (
    <Box
      backgroundColor={"black"}
      ref={innerRef}
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
