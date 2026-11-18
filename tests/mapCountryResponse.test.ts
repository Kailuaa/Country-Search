import { describe, it, expect } from 'vitest';
import type { Country } from '../src/types/country';
import { mapCountryResponse } from '../src/mapCountryResponse';

describe('mapCountryResponse', () => {
  const raw = {
    name: 'Spain',
    flag: 'https://flagcdn.com/es.svg',
    capital: 'Madrid',
    region: 'Europe',
    population: 47351567,
    languages: [
      {
        name: 'Spanish',
        iso639_1: 'es',
        iso639_2: 'spa',
        nativeName: 'Español',
      },
    ],
    area: 505992,
    borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
    subregion: 'Southern Europe',
    currencies: [
      {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
      },
    ],
  };
  it('should transform API response into Country object', () => {
    const result = mapCountryResponse(raw);
    const expected: Country = {
      name: 'Spain',
      flag: 'https://flagcdn.com/es.svg',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      languages: ['Spanish'],
      area: 505992,
      borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
      subregion: 'Southern Europe',
      currencies: [
        {
          code: 'EUR',
          name: 'Euro',
          symbol: '€',
        },
      ],
    };

    expect(result).toEqual(expected);
  });
  it('should correctly map multiple languages', () => {
    const country = {
      ...raw,
      languages: [{ name: 'Spanish' }, { name: 'French' }, { name: 'German' }],
    };

    const result = mapCountryResponse(country);

    expect(result.languages).toEqual(['Spanish', 'French', 'German']);
  });
  it('should correctly map empty borders', () => {
    const country = {
      ...raw,
      borders: [],
    };

    const result = mapCountryResponse(country);

    expect(result.borders).toEqual([]);
  });
  it('should not modify the original API response', () => {
    const original = structuredClone(raw);

    mapCountryResponse(raw);

    expect(raw).toEqual(original);
  });
  it('should return a new currencies array', () => {
    const result = mapCountryResponse(raw);

    expect(result.currencies).not.toBe(raw.currencies);
  });
});
