import 'jest';
import faker from 'faker';

import connection from '../../utils/db';
import { createUser, authenticate } from '../user';

beforeAll(async () => {
  await connection.open();
});

afterAll(async () => {
  await connection.close();
});

describe('create new user', () => {
  test('should create new user', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const user = await createUser(userData);
    expect(user).not.toBeNull();
  });
  test('should not create same user twice', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createUser(userData);
    createUser(userData).catch(e => expect(e).toBeTruthy());
  });
  test('should not create new user', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: '',
    };
    createUser(userData).catch(e => expect(e).toBeTruthy());
  });
  test('should return id and token', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const resp = await createUser(userData);
    expect(resp).toHaveProperty('id');
    expect(resp).toHaveProperty('token');
    expect(resp.id).toBeTruthy();
    expect(resp.token).toBeTruthy();
  });
});

describe('authenticate user', () => {
  test('should authenticate', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createUser(userData);
    const result = await authenticate(userData);
    expect(result.exists).toBe(true);
    expect(result.authenticated).toBe(true);
    expect(result.token).not.toBeNull();
  });
  test('should NOT exist', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const userData2 = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createUser(userData);
    const result = await authenticate(userData2);
    expect(result.exists).toBe(false);
    expect(result.authenticated).toBeUndefined();
    expect(result.token).toBeUndefined();
  });
  test('should NOT authenticate', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const userData2 = {
      username: userData.username,
      password: faker.internet.password(),
    };
    await createUser(userData);
    const result = await authenticate(userData2);
    expect(result.exists).toBe(true);
    expect(result.authenticated).toBe(false);
    expect(result.token).toBeUndefined();
  });
});
