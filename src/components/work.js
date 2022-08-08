import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
const Work = (props) => {
  return (
    <Box as={motion.div} {...props}>
      <div className="work-header">
        <h1>Work</h1>
      </div>
      <div className="work-content">
        <div className="work-content-item">
          <div className="work-content-item-header">
            <h2>
              <a
                href="https://www.youtube.com/watch?v=_qQ-_Q-_Q-_"
                target="_blank"
              >
                {/* <img src={youtube} alt="youtube" /> */}
              </a>
            </h2>
          </div>
          <div className="work-content-item-content">
            <p>
              This is a youtube video I made to show how to use the youtube API.
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Work;
