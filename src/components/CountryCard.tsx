import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { CountryBasic } from "../types/CountryTypes";

interface Props {
  country: CountryBasic;
}

const CountryCard = ({ country }: Props) => {
  return (
    <Link
      to={`/country/${country.name.common}`}
      className="w-75 md:w-full h-full mx-auto"
    >
      <motion.article
        className="bg-white flex flex-col shadow-xl rounded-lg overflow-hidden dark:bg-blue-900 h-full"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-full overflow-hidden h-[170px] 2xl:h-[200px]">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `${country.name.common} flag`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <section className="px-5 pt-8 pb-10 space-y-2 my-auto md:p-10 md:space-y-3">
          <h2 className="font-bold text-xl">{country.name.common}</h2>
          <dl>
            {[
              ["Population", country.population.toLocaleString()],
              ["Region", country.region],
              ["Capital", country.capital?.join(", ") || "N/A"],
            ].map((item, index) => (
              <div key={index} className="dl-div">
                <dt>{item[0]}:</dt>
                <dd className="font-thin">{item[1]}</dd>
              </div>
            ))}
          </dl>
        </section>
      </motion.article>
    </Link>
  );
};

export default CountryCard;
