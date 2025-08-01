import { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import CountryCard from "./CountryCard";
import RegionFilter from "./RegionFilter";

export type CountryBasic = {
  flags: {
    png: string;
    alt?: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
};

export type filterRegion =
  | "Africa"
  | "America"
  | "Asia"
  | "Europe"
  | "Oceania"
  | null;

const Main = () => {
  const [countries, setCountries] = useState<CountryBasic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<filterRegion>(null);

  useEffect(() => {
    const getCountriesInfo = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
        );

        const data = response.data;

        const sortedData = data.sort((a: CountryBasic, b: CountryBasic) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setCountries(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    getCountriesInfo();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((item) => {
      const matchesSearch = item.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion = filterRegion ? item.region === filterRegion : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, filterRegion]);

  return (
    <main className="px-4 py-8 space-y-10 md:py-10 md:px-10 2xl:px-50 lg:m-auto w-full flex-1">
      <div className="space-y-7 md:flex md:justify-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <RegionFilter
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
        />
      </div>
      <div
        className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 
      2xl:grid-cols-4 md:gap-15 lg:gap-10 xl:gap-15"
      >
        {filteredCountries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
    </main>
  );
};

export default Main;
