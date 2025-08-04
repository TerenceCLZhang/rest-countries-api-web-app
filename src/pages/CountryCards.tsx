import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import Selector from "../components/Selector";
import type {
  CountryBasic,
  SortOrder,
  FilterRegion,
} from "../types/CountryTypes";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { API_TIMEOUT } from "../App";

const CountryCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchQuery = searchParams.get("search") || "";
  const initialFilterRegion =
    (searchParams.get("region") as FilterRegion) || "Filter by Region";
  const initialSortOrder =
    (searchParams.get("order") as SortOrder) || "Name (A → Z)";

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState<CountryBasic[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filterRegion, setFilterRegion] =
    useState<FilterRegion>(initialFilterRegion);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  useEffect(() => {
    const getCountriesInfo = async () => {
      setLoading(true);
      setError(false);

      // Timeout helper
      const timeout = (ms: number) =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), ms)
        );

      try {
        const response = await Promise.race([
          axios.get(
            "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
          ),
          timeout(API_TIMEOUT), // 10 seconds
        ]);

        const data = (response as any).data;

        const sortedData = data.sort((a: CountryBasic, b: CountryBasic) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setCountries(sortedData);
      } catch (error: any) {
        setError(true);
        const message = error?.message || "An unexpected error occurred";
        toast.error(message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0); // Start the webpage at the top

    getCountriesInfo();
  }, []);

  // Update URL Paramters when filters change
  useEffect(() => {
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    if (filterRegion !== "Filter by Region") params.region = filterRegion;
    if (sortOrder !== "Name (A → Z)") params.order = sortOrder;

    setSearchParams(params);
  }, [searchQuery, filterRegion, sortOrder, setSearchParams]);

  // Update the countries displayed on the web page
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
    <div className="space-y-10">
      <div className="space-y-7 lg:flex lg:justify-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="space-y-3 md:flex md:gap-2">
          <Selector<FilterRegion>
            getter={filterRegion}
            setter={setFilterRegion}
            items={[
              "Filter by Region",
              "Africa",
              "Americas",
              "Asia",
              "Europe",
              "Oceania",
            ]}
            ariaLabel="Filter region selector"
          />
          <Selector<SortOrder>
            getter={sortOrder}
            setter={setSortOrder}
            items={[
              "Name (A → Z)",
              "Name (Z → A)",
              "Population (High → Low)",
              "Population (Low → High)",
            ]}
            ariaLabel="Sort order selector"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-15 lg:gap-10 xl:gap-15 2xl:gap-20"
        >
          {error ? (
            <p className="text-center text-lg col-span-full text-red-600">
              Failed to load countries. Please try again later.
            </p>
          ) : displayedCountries.length > 0 ? (
            displayedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))
          ) : (
            <p className="text-center text-lg col-span-full">
              No countries match your filters or search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryCards;
