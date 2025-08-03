import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SortOrder, FilterRegion } from "../types/CountryTypes";
import { motion } from "framer-motion";

interface Props<T extends FilterRegion | SortOrder> {
  filter: T;
  setFilter: React.Dispatch<React.SetStateAction<T>>;
  items: string[];
}

const Filter = <T extends FilterRegion | SortOrder>({
  filter,
  setFilter,
  items,
}: Props<T>) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChooseOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let selectedRegion = e.currentTarget.textContent as T;
    setFilter(selectedRegion);
    setShowOptions(false);
  };

  return (
    <section
      ref={containerRef}
      className="w-[75%] space-y-2 relative font-thin lg:w-65"
      aria-label="Filter dropdown"
    >
      <div
        className="flex bg-white px-4 py-3 gap-2 shadow-sm justify-between 
        rounded-md cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{filter}</span>
        <button
          type="button"
          className="border-l border-gray-400 pl-4"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
          }}
          aria-expanded={showOptions}
          aria-controls="options"
          aria-haspopup="listbox"
        >
          <motion.div
            animate={{ rotate: showOptions ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown />
          </motion.div>
        </button>
      </div>

      {showOptions && (
        <ul
          id="options"
          className="bg-white gap-2 shadow-sm rounded-md absolute w-full 
          overflow-hidden z-10"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-3 hover:bg-gray-200"
              onClick={handleChooseOption}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Filter;
