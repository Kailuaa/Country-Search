export interface Country {
  name: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  area: number;
  borders: string[];
  languages: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
}
