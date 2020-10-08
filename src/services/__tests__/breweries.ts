import 'jest';

import { getBreweryList } from '../breweries';

describe('getting brewery list', () => {
  test('with query', async () => {
    const list = await getBreweryList('dog');
    // Testing for results coming through
    expect(list).not.toBeNull();
    expect(list.length).toBeGreaterThanOrEqual(1);
    // Testing for response structure
    expect(list[0]).toHaveProperty('id');
    expect(list[0]).toHaveProperty('name');
    expect(list[0]).toHaveProperty('brewery_type');
    expect(list[0]).toHaveProperty('street');
    expect(list[0]).toHaveProperty('city');
    expect(list[0]).toHaveProperty('state');
    expect(list[0]).toHaveProperty('postal_code');
    expect(list[0]).toHaveProperty('country');
    expect(list[0]).toHaveProperty('longitude');
    expect(list[0]).toHaveProperty('latitude');
    expect(list[0]).toHaveProperty('phone');
    expect(list[0]).toHaveProperty('website_url');
    expect(list[0]).toHaveProperty('updated_at');
  });
  test('without query', async () => {
    const list = await getBreweryList();
    // Testing for results coming through
    expect(list).not.toBeNull();
    expect(list.length).toBeGreaterThanOrEqual(1);
    // Testing for response structure
    expect(list[0]).toHaveProperty('id');
    expect(list[0]).toHaveProperty('name');
    expect(list[0]).toHaveProperty('brewery_type');
    expect(list[0]).toHaveProperty('street');
    expect(list[0]).toHaveProperty('city');
    expect(list[0]).toHaveProperty('state');
    expect(list[0]).toHaveProperty('postal_code');
    expect(list[0]).toHaveProperty('country');
    expect(list[0]).toHaveProperty('longitude');
    expect(list[0]).toHaveProperty('latitude');
    expect(list[0]).toHaveProperty('phone');
    expect(list[0]).toHaveProperty('website_url');
    expect(list[0]).toHaveProperty('updated_at');
  });
});
