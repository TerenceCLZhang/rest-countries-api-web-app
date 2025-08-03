import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DetailsMainDisplay from "../components/DetailsMainDisplay";
import MapLinks from "../components/MapLinks";
import BorderCountries from "../components/BorderCountries";
import type { CountryDetails } from "../types/CountryTypes";

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

            <DetailsMainDisplay countryData={countryData} />

            <MapLinks name={countryData.name.common} />

            <BorderCountries borders={countryData.borders} />
          </div>
        </section>
      )}
    </article>
  );
};

export default CountryDetails;
