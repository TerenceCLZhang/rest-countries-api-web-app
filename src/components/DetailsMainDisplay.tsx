import type { CountryDetails } from "../types/CountryTypes";

interface Props {
  countryData: CountryDetails;
}

const DetailsMainDisplay = ({ countryData }: Props) => {
  const countryPrimaryData = [
    {
      label: "Native Names",
      value: countryData.name.nativeName
        ? [
            ...new Set(
              Object.values(countryData.name.nativeName).map((n) => n.common)
            ),
          ].join(", ")
        : "N/A",
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
      value: countryData.subregion || "N/A",
    },
    {
      label: "Capital",
      value: countryData.capital?.join(", ") || "N/A",
    },
  ];

  const countrySecondaryData = [
    {
      label: "Top Level Domain",
      value: countryData.tld?.[0] || "N/A",
    },
    {
      label: "Currencies",
      value: countryData.currencies
        ? Object.values(countryData.currencies)
            .map((currency) => currency.name)
            .join(", ")
        : "N/A",
    },
    {
      label: "Languages",
      value: countryData.languages
        ? Object.values(countryData.languages).join(", ")
        : "N/A",
    },
  ];

  return (
    <div
      className="space-y-10 -mt-3 flex flex-col lg:flex-row 
            lg:justify-between lg:gap-15 lg:space-y-0"
    >
      <dl className="space-y-3 lg:flex-1/2">
        {countryPrimaryData.map(({ label, value }) => (
          <div key={label} className="dl-div">
            <dt className="font-bold whitespace-nowrap">{label}:</dt>
            <dd className="font-thin">{value}</dd>
          </div>
        ))}
      </dl>

      <dl className="space-y-3 lg:flex-1/2">
        {countrySecondaryData.map(({ label, value }) => (
          <div key={label} className="dl-div">
            <dt className="font-bold whitespace-nowrap">{label}:</dt>
            <dd className="font-thin">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default DetailsMainDisplay;
