import axios from "axios";
import { useEffect, useState } from "react";
import DetailsMainDisplay from "../components/DetailsMainDisplay";
import MapLinks from "../components/MapLinks";
import BorderCountries from "../components/BorderCountries";
import type { CountryDetailed } from "../types/CountryTypes";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import { API_TIMEOUT } from "../App";

const CountryDetails = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { country } = useParams();
  const [countryData, setCountryData] = useState<CountryDetailed | null>(null);

  useEffect(() => {
    const getCountryDetails = async () => {
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
            `https://restcountries.com/v3.1/name/${country}?fullText=true`
          ),
          timeout(API_TIMEOUT),
        ]);

        setCountryData((response as any).data[0]);
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

    getCountryDetails();
  }, [country]);

  return (
    <article className="text-detail">
      <BackButton />

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-lg col-span-full text-red-600">
          Failed to load country/territory. Please try again later.
        </p>
      ) : (
        countryData && (
          <section className="flex flex-col gap-10 lg:flex-row lg:gap-15 xl:gap-30">
            <div className="self-center flex-1/2 w-full">
              <img
                src={countryData.flags.svg}
                alt={
                  countryData.flags.alt || `${countryData?.name.common} flag`
                }
                className="w-full h-auto max-h-100 object-contain"
              />
            </div>

            <div className="flex gap-10 flex-col flex-1/2 lg:self-center">
              <div className="space-y-2">
                <h2 className="font-bold text-4xl">
                  {countryData.name.common}
                </h2>
                <span className="font-semibold text-2xl">
                  {countryData.name.official}
                </span>
              </div>

              <DetailsMainDisplay countryData={countryData} />

              <MapLinks name={countryData.name.common} />

              <BorderCountries borders={countryData.borders} />
            </div>
          </section>
        )
      )}
    </article>
  );
};

export default CountryDetails;
