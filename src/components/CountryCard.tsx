import type { CountryBasic } from "./Main";
import { motion } from "framer-motion";

interface Props {
  country: CountryBasic;
}

const CountryCard = ({ country }: Props) => {
  return (
    <motion.article
      className="bg-white w-75 flex flex-col mx-auto shadow-xl 
      rounded-lg overflow-hidden md:w-full md:h-full"
      whileHover={{ scale: 1.1 }}
    >
      <div className="w-full overflow-hidden h-[170px] lg:h-[200px]">
        <img
          src={country.flags.png}
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
            ["Capital", country.capital.join(", ")],
          ].map((item, index) => (
            <div key={index} className="flex gap-1">
              <dt>{item[0]}:</dt>
              <dl className="font-thin">{item[1]}</dl>
            </div>
          ))}
        </dl>
      </section>
    </motion.article>
  );
};

export default CountryCard;
