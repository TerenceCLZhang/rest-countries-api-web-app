import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="inline-block"
      >
        <Loader className="h-10 w-10" />
      </motion.div>
      <span className="text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
