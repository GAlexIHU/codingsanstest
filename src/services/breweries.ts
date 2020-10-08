import axios from 'axios';

interface Brewery {
  id: number;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  updated_at: string;
}

type APIResponse = Array<Brewery> | [];

export type BreweryList = APIResponse;

export const getBreweryList = async (query?: string): Promise<BreweryList> => {
  const BASE_URL_WITH_QUERY = 'https://api.openbrewerydb.org/breweries/search?';
  const BASE_URL_WITHOUT_QUERY = 'https://api.openbrewerydb.org/breweries';
  if (query) {
    const resp = await axios.get(BASE_URL_WITH_QUERY, {
      params: { query },
    });
    return resp.data as BreweryList;
  } else {
    const resp = await axios.get(BASE_URL_WITHOUT_QUERY);
    return resp.data as BreweryList;
  }
};
