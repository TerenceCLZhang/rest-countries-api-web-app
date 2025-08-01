import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import CountryCard from "./CountryCard";
import CountryFilter from "./CountryFilter";

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

const Main = () => {
  const [countries, setCountries] = useState<CountryBasic[]>([]);

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

  const filterCountries = (value: string) => {
    return countries.filter((item) =>
      item.name.common.toLowerCase().includes(value.toLowerCase())
    );
  };

  return (
    <main className="px-4 py-8 space-y-15">
      <div className="space-y-7">
        <SearchBar countries={countries} />
        <CountryFilter />
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-4 lg:gap-20 lg:w-[85%] lg:m-auto">
        {countries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
    </main>
  );
};

export default Main;
