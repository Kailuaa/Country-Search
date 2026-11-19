import type { Country } from './types/country';
import type { CountryApiResponse } from './types/CountryApiResponse';

export function mapCountryResponse(raw: CountryApiResponse): Country {
  return {
    name: raw.name,
    flag: raw.flags.svg,
    capital: raw.capital,
    region: raw.region,
    population: raw.population,
    languages: raw.languages.map((language) => language.name),
    area: raw.area,
    borders: [...raw.borders],
    subregion: raw.subregion,
    currencies: raw.currencies.map((currency) => ({ ...currency })),
  };
}
