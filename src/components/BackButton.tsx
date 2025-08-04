import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(-1)}
      className="bg-white shadow-md flex items-center space-x-2 px-7 
        py-2 rounded-lg mb-10"
      whileHover={{ scale: 1.1 }}
    >
      <ArrowLeft /> <span>Back</span>
    </motion.button>
  );
};

export default BackButton;
