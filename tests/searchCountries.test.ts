import { afterEach, describe, it, expect, vi } from 'vitest';
import { searchCountries } from '../src/searchCountries';

describe('searchCountries', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch country by query', async () => {
    const countries = [{ name: 'Spain' }];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(countries),
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    const result = await searchCountries('spain', controller.signal);

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('https://countries.dev/name/spain', {
      signal: controller.signal,
    });

    expect(result).toEqual(countries);
  });
  it('should encode query in URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue([]),
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    searchCountries('south korea', controller.signal);

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('https://countries.dev/name/south%20korea', {
      signal: controller.signal,
    });
  });
  it('should return empty array when response status is 404', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 404,
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    const result = await searchCountries('nonexistent', controller.signal);

    expect(result).toEqual([]);
  });
  it('should throw HttpError when response status is not successful', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 500,
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    await expect(searchCountries('spain', controller.signal)).rejects.toMatchObject({
      name: 'HttpError',
      status: 500,
    });
  });
  it('should propagate network errors', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network Error'));

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    await expect(searchCountries('spain', controller.signal)).toThrow('Network Error');
  });
});
