import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SortOrder, FilterRegion } from "../types/CountryTypes";
import { motion } from "framer-motion";

interface Props<T extends FilterRegion | SortOrder> {
  getter: T;
  setter: React.Dispatch<React.SetStateAction<T>>;
  items: string[];
  ariaLabel: string;
}

const Selector = <T extends FilterRegion | SortOrder>({
  setter,
  getter,
  items,
  ariaLabel,
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
    setter(selectedRegion);
    setShowOptions(false);
  };

  return (
    <section
      ref={containerRef}
      className="w-[75%] space-y-2 relative font-thin lg:w-65"
      aria-label={ariaLabel}
    >
      <div
        className="flex bg-white px-4 py-3 gap-2 shadow-sm justify-between rounded-md cursor-pointer dark:bg-blue-900"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{getter}</span>
        <div className="flex gap-4">
          <div className="border-l h-full border-gray-400" />
          <button
            type="button"
            className=""
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            aria-label={`${showOptions ? "Close" : "Show"} options`}
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
      </div>

      {showOptions && (
        <ul
          id="options"
          className="bg-white gap-2 shadow-md rounded-md absolute w-full 
          overflow-hidden z-10 dark:bg-blue-900"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-500"
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

export default Selector;
