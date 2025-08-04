import { Link } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";

const Header = () => {
  return (
    <header
      className="bg-white shadow-md flex items-center px-4 py-8 
    justify-between md:px-10 2xl:px-50 dark:bg-blue-900"
    >
      <h1 className="font-bold text-lg lg:text-3xl">
        <Link to="/" className="flex items-center gap-2">
          <span>Where in the world?</span>
        </Link>
      </h1>
      <DarkModeSwitch />
    </header>
  );
};

export default Header;
