import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { CountryBasic } from "../types/CountryTypes";

interface Props {
  country: CountryBasic;
}

const CountryCard = ({ country }: Props) => {
  const navigate = useNavigate();

  return (
    <Link to={`/country/${country.name.common}`}>
      <motion.article
        className="bg-white w-75 flex flex-col mx-auto shadow-xl
        rounded-lg overflow-hidden md:w-full md:h-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-full overflow-hidden h-[170px] lg:h-[200px]">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `${country.name.common} flag`}
            className="w-full h-full object-cover"
          />
        </div>
        <section className="px-5 pt-8 pb-10 space-y-2 my-auto md:py-8 md:space-y-3">
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
