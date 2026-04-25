import { motion } from "framer-motion";

const PageVariants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: "-20%",
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeOut",
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;