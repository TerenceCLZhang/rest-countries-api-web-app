export type CountryBasic = {
  flags: {
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
  population: number;
};

export type FilterRegion =
  | "Africa"
  | "America"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Filter by Region";

export type SortOrder =
  | "Name (A → Z)"
  | "Name (Z → A)"
  | "Population (Low → High)"
  | "Population (High → Low)";

export type CountryDetailed = {
  flags: {
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
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
  currencies?: {
    [currencyCode: string]: {
      name: string;
    };
  };
  languages?: {
    [languageCode: string]: string;
  };
  borders: string[];
};
