import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import countryCodes from "../utils/ISO-3366-1_Alpha-3_Codes.json";

interface Props {
  borders: string[];
}

const BorderCountries = ({ borders }: Props) => {
  const navigate = useNavigate();

  return (
    <section>
      <h3 className="text-lg font-bold mb-3">Border Countries:</h3>
      {borders ? (
        <div className="grid grid-cols-3 gap-4">
          {borders.map((borderCountry, index) => {
            const countryName = (countryCodes as any)[borderCountry];
            return (
              <motion.button
                type="button"
                key={index}
                onClick={() => navigate(`/country/${countryName}`)}
                className="bg-white shadow-md rounded-lg py-2 h-full w-full dark:bg-blue-900"
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
  );
};

export default BorderCountries;
