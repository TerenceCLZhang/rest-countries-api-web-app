import { Moon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md flex items-center px-4 py-8 justify-between">
      <h1 className="font-bold text-lg">
        <a href="#">Where in the world?</a>
      </h1>
      <button className="flex items-center gap-2">
        <Moon /> <span>Dark Mode</span>
      </button>
    </header>
  );
};

export default Header;
