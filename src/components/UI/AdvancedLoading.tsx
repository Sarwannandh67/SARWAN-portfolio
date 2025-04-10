import { motion } from "framer-motion";

interface AdvancedLoadingProps {
  message?: string;
  progress?: number;
  className?: string;
}

const AdvancedLoading = ({ 
  message = "Loading...", 
  progress,
  className = "" 
}: AdvancedLoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-24 h-24 mb-6">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-primary/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-[30%] rounded-full bg-primary"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-foreground/90 font-medium mb-4"
        >
          {message}
        </motion.p>
      )}
      
      {progress !== undefined && (
        <div className="w-48 h-2 bg-background/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedLoading; 