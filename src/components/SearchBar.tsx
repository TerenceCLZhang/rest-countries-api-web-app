import { Search } from "lucide-react";
import type { CountryBasic } from "./Main";

interface Props {
  countries: CountryBasic[];
}

const SearchBar = ({ countries }: Props) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    const filteredCountries = countries.filter((item) =>
      item.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(filteredCountries);
  };

  return (
    <div className="flex bg-white px-5 py-3 gap-2 shadow-sm">
      <Search />
      <input
        type="text"
        placeholder="Search for a country..."
        className="flex-1 focus:outline-transparent placeholder:text-gray-400"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
