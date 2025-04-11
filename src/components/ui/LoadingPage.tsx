import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message = "Loading..." }: LoadingPageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md z-50"
      >
        <LoadingSpinner size="lg" className="mb-4" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-lg text-foreground/90 font-medium"
        >
          {message}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage; 