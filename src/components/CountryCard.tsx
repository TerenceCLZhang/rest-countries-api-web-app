import type { CountryBasic } from "./Main";

interface Props {
  country: CountryBasic;
}

const CountryCard = ({ country }: Props) => {
  return (
    <article className="bg-white w-[85%] mx-auto shadow-xl rounded-lg overflow-hidden lg:w-full lg:h-full">
      <div className="w-full overflow-hidden h-[200px]">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `${country.name.common} flag`}
          className="w-full h-full object-cover"
        />
      </div>
      <section className="px-5 pt-8 pb-10 space-y-2">
        <h2 className="font-bold text-xl">{country.name.common}</h2>
        <dl>
          {[
            ["Population", country.population],
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
    </article>
  );
};

export default CountryCard;
