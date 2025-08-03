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
  const [sortOrder, setSortOrder] = useState<SortOrder>("Name (A → Z)");

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

  const displayedCountries = useMemo(() => {
    const filteredCountries = countries.filter((item) => {
      // Search Bar
      const matchesSearch = item.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // Region Selector
      const matchesRegion =
        filterRegion !== "Filter by Region"
          ? item.region === filterRegion
          : true;
      return matchesSearch && matchesRegion;
    });

    // Sort display order of countries
    const filteredAndSortedCountries = filteredCountries.sort((a, b) =>
      sortOrder === "Name (A → Z)"
        ? a.name.common.localeCompare(b.name.common)
        : sortOrder === "Name (Z → A)"
        ? b.name.common.localeCompare(a.name.common)
        : sortOrder === "Population (Low → High)"
        ? a.population - b.population
        : b.population - a.population
    );

    return filteredAndSortedCountries;
  }, [countries, searchQuery, filterRegion, sortOrder]);

  return (
    <main
      className="px-4 py-8 space-y-10 md:py-10 md:px-10 2xl:px-50 
    lg:m-auto w-full flex-1"
    >
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
                filter={sortOrder}
                setFilter={setSortOrder}
                items={[
                  "Name (A → Z)",
                  "Name (Z → A)",
                  "Population (High → Low)",
                  "Population (Low → High)",
                ]}
              />
            </div>
          </div>
          <div
            className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 
            2xl:grid-cols-4 md:gap-15 lg:gap-10 xl:gap-15"
          >
            {displayedCountries.length > 0 ? (
              displayedCountries.map((country, index) => (
                <CountryCard key={index} country={country} />
              ))
            ) : (
              <p className="text-center text-lg col-span-full">
                No countries match your filters or search.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default CountryCards;
