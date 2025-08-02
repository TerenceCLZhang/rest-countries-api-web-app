import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { filterRegion } from "../pages/CountryCards";

interface Props {
  filterRegion: filterRegion;
  setFilterRegion: React.Dispatch<React.SetStateAction<filterRegion>>;
}

const RegionFilter = ({ filterRegion, setFilterRegion }: Props) => {
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
    let selectedRegion = e.currentTarget.textContent;

    if (selectedRegion === "Filter by Region") {
      setFilterRegion(null);
    } else {
      setFilterRegion(selectedRegion as filterRegion);
    }

    setShowOptions(false);
  };

  return (
    <section
      ref={containerRef}
      className="w-[65%] space-y-2 relative font-thin md:w-65"
      aria-label="Region filter dropdown"
    >
      <div
        className="flex bg-white px-4 py-3 gap-2 shadow-sm justify-between 
rounded-md cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{filterRegion || "Filter by Region"}</span>
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
          {showOptions ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {showOptions && (
        <ul
          id="options"
          className="bg-white gap-2 shadow-sm rounded-md absolute w-full 
          overflow-hidden"
        >
          {[
            "Filter by Region",
            "Africa",
            "Americas",
            "Asia",
            "Europe",
            "Oceania",
          ].map((region, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-3 hover:bg-gray-200"
              onClick={handleChooseOption}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RegionFilter;
