import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import type {
  CountryBasic,
  SortOrder,
  FilterRegion,
} from "../types/CountryTypes";

const CountryCards = () => {
  const [countries, setCountries] = useState<CountryBasic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] =
    useState<FilterRegion>("Filter by Region");
  const [filterOrder, setFilterOrder] = useState<SortOrder>("Name (A → Z)");

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

    window.scrollTo(0, 0); // Start the webpage at the top

    getCountriesInfo();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((item) => {
      const matchesSearch = item.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        filterRegion !== "Filter by Region"
          ? item.region === filterRegion
          : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, filterRegion]);

  return (
    <main className="px-4 py-8 space-y-10 md:py-10 md:px-10 2xl:px-50 lg:m-auto w-full flex-1">
      {countries && (
        <>
          <div className="space-y-7 lg:flex lg:justify-between">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <div className="space-y-3 md:flex md:gap-2">
              <Filter<FilterRegion>
                filter={filterRegion}
                setFilter={setFilterRegion}
                items={[
                  "Filter by Region",
                  "Africa",
                  "Americas",
                  "Asia",
                  "Europe",
                  "Oceania",
                ]}
              />
              <Filter<SortOrder>
                filter={filterOrder}
                setFilter={setFilterOrder}
                items={[
                  "Name (A → Z)",
                  "Name (Z → A)",
                  "Population (Low → High)",
                  "Population (High → Low)",
                ]}
              />
            </div>
          </div>
          <div
            className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 
      2xl:grid-cols-4 md:gap-15 lg:gap-10 xl:gap-15"
          >
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default CountryCards;
