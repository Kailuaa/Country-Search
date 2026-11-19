export interface CountryApiResponse {
  name: string;
  flags: {
    svg: string;
  };
  capital: string;
  region: string;
  population: number;
  languages: {
    name: string;
  }[];
  area: number;
  borders: string[];
  subregion: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
}
