import { Search, X } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <section className="flex px-5 py-3 bg-white shadow-sm font-thin md:w-100 2xl:w-135">
      <label htmlFor="country" className="flex gap-2 flex-1">
        <Search />
        <span className="sr-only">Search for a country</span>
        <input
          id="country"
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          className="flex-1 focus:outline-transparent placeholder:text-gray-400 pr-5"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
      {searchQuery && (
        <button
          type="button"
          className="border-l border-gray-400 pl-5"
          onClick={() => setSearchQuery("")}
        >
          <X />
        </button>
      )}
    </section>
  );
};

export default SearchBar;
