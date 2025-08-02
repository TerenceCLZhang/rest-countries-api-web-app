import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import countryCodes from "../utils/ISO-3366-1_Alpha-3_Codes.json";

type CountryDetails = {
  flags: {
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        common: string;
      };
    };
  };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  tld?: string[];
  currencies: {
    [currencyCode: string]: {
      name: string;
    };
  };
  languages: {
    [languageCode: string]: string;
  };
  borders: string[];
};

const CountryDetails = () => {
  const { country } = useParams();
  const [countryData, setCountryData] = useState<CountryDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        setCountryData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    window.scrollTo(0, 0); // Start the webpage at the top

    getCountryDetails();
  }, [country]);

  return (
    <article
      className="px-4 py-8 md:py-10 md:px-10 2xl:px-50 lg:m-auto w-full 
    flex-1 text-detail"
    >
      <motion.button
        type="button"
        onClick={() => navigate("/")}
        className="bg-white shadow-md flex items-center space-x-2 px-7 
        py-2 rounded-lg mb-10"
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft /> <span>Back</span>
      </motion.button>

      {countryData && (
        <section className="flex flex-col gap-10 lg:flex-row lg:gap-15 xl:gap-30">
          <div className="self-center flex-1/2 w-full">
            <img
              src={countryData.flags.svg}
              alt={countryData.flags.alt || `${countryData?.name.common} flag`}
              className="w-full h-auto max-h-100 object-contain"
            />
          </div>

          <div className="flex gap-10 flex-col flex-1/2 lg:self-center">
            <div className="space-y-2">
              <h2 className="font-bold text-4xl">{countryData.name.common}</h2>
              <span className="font-semibold text-2xl">
                {countryData.name.official}
              </span>
            </div>

            <div
              className="space-y-10 -mt-3 flex flex-col lg:flex-row 
            lg:justify-between lg:gap-15 lg:space-y-0"
            >
              <dl className="space-y-3 lg:flex-1/2">
                {[
                  {
                    label: "Native Names",
                    value: [
                      ...new Set(
                        Object.values(countryData.name.nativeName).map(
                          (n) => n.common
                        )
                      ),
                    ].join(", "),
                  },
                  {
                    label: "Population",
                    value: countryData.population.toLocaleString(),
                  },
                  {
                    label: "Region",
                    value: countryData.region,
                  },
                  {
                    label: "Sub Region",
                    value: countryData.subregion,
                  },
                  {
                    label: "Capital",
                    value: countryData.capital?.join(", ") || "N/A",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="dl-div">
                    <dt className="font-bold whitespace-nowrap">{label}:</dt>
                    <dd className="font-thin">{value}</dd>
                  </div>
                ))}
              </dl>

              <dl className="space-y-3 lg:flex-1/2">
                {[
                  {
                    label: "Top Level Domain",
                    value: countryData.tld?.[0] || "N/A",
                  },
                  {
                    label: "Currencies",
                    value: Object.values(countryData.currencies)
                      .map((currency) => currency.name)
                      .join(", "),
                  },
                  {
                    label: "Languages",
                    value: Object.values(countryData.languages).join(", "),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="dl-div">
                    <dt className="font-bold whitespace-nowrap">{label}:</dt>
                    <dd className="font-thin">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <section>
              <h3 className="text-lg font-bold mb-5">Maps:</h3>
              <div className="flex gap-2">
                {[
                  {
                    name: "Google",
                    url: (name: string) =>
                      `https://www.google.com/maps/place/${name}`,
                  },
                  {
                    name: "Bing",
                    url: (name: string) =>
                      `https://www.bing.com/maps?q=${name}`,
                  },
                  {
                    name: "Duck Duck Go",
                    url: (name: string) =>
                      `https://duckduckgo.com/?q=${name}&iaxm=maps`,
                  },
                ].map((service) => (
                  <motion.a
                    key={service.name}
                    href={service.url(countryData.name.common)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-md rounded-lg w-fit px-5 
                    py-3 hover:font-normal flex-1/3 flex items-center 
                    justify-center text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.name}
                  </motion.a>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-3">Border Countries:</h3>
              {countryData.borders ? (
                <div className="grid grid-cols-3 gap-4">
                  {countryData.borders.map((borderCountry, index) => {
                    const countryName = (countryCodes as any)[borderCountry];
                    return (
                      <motion.button
                        type="button"
                        key={index}
                        onClick={() => navigate(`/country/${countryName}`)}
                        className="bg-white shadow-md rounded-lg py-2 h-full w-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {countryName || borderCountry}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p>This country has no bordering nations.</p>
              )}
            </section>
          </div>
        </section>
      )}
    </article>
  );
};

export default CountryDetails;
