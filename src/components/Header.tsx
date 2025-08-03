import { Moon } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="bg-white shadow-md flex items-center px-4 py-8 
    justify-between md:px-10 2xl:px-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, type: "spring", stiffness: 30 }}
    >
      <h1 className="font-bold text-lg lg:text-3xl">
        <a href="/" className="flex items-center gap-2">
          <img src="globe.svg" alt="logo" className="h-8" /> Where in the world?
        </a>
      </h1>
      <button className="flex items-center gap-2">
        <Moon /> <span>Dark Mode</span>
      </button>
    </motion.header>
  );
};

export default Header;
