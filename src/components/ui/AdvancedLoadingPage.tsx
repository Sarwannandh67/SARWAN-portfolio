import { motion, AnimatePresence } from "framer-motion";
import AdvancedLoading from "./AdvancedLoading";

interface AdvancedLoadingPageProps {
  message?: string;
  progress?: number;
}

const AdvancedLoadingPage = ({ 
  message = "Loading...", 
  progress 
}: AdvancedLoadingPageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md z-50"
      >
        <AdvancedLoading message={message} progress={progress} />
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvancedLoadingPage; 