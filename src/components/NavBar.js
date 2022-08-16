import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [navOpen, setNavOpen] = useState(false);

  const backdropVarients = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 1,
      },
    },
  };

  const linkVarientOne = {
    initial: {
      opacity: 0,
      x: 40,
      y: -40,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: -40,
    },
  };

  const linkVarientTwo = {
    initial: {
      opacity: 0,
      x: -40,
      y: -40,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: 40,
    },
  };

  const navContentVarient = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const hoverVariants = {
    background: [
      `linear-gradient(to right,#AB4967 0%, white 0%)`,
      `linear-gradient(to right,#AB4967 20%, white 20%)`,
      `linear-gradient(to right,#AB4967 40%, white 40%)`,
      `linear-gradient(to right,#AB4967 60%, white 60%)`,
      `linear-gradient(to right,#AB4967 80%, white 80%)`,
      `linear-gradient(to right,#AB4967 100%, white 100%)`,
    ],
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  };
  return (
    <div className="App">
      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className={`hamburger hamburger--vortex ${navOpen && "is-active"}`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            variants={backdropVarients}
            className="nav-backdrop"
          >
            <motion.div
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
              variants={navContentVarient}
              className="nav-content"
            >
              <motion.a variants={linkVarientOne} whileHover={hoverVariants}>
                Home
              </motion.a>
              <motion.a variants={linkVarientTwo} whileHover={hoverVariants}>
                About
              </motion.a>
              <motion.a variants={linkVarientOne} whileHover={hoverVariants}>
                Contact Us
              </motion.a>
              <motion.a variants={linkVarientTwo} whileHover={hoverVariants}>
                Newsletter
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
