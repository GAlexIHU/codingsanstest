import 'jest';

import faker from 'faker';
import connection from '../../utils/db';
import User from '../User';

jest.setTimeout(30000);

// Opening and closing the mockdb connection
beforeAll(async () => {
  await connection.open();
});

afterAll(async () => {
  await connection.close();
});

describe('creating new user', () => {
  test('should create user and find it in db', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new User(userData);
    await user.save();

    const found = await User.findById(user._id);

    expect(found).not.toBeNull();
    expect(found?.username).toBe(userData.username);
    expect(found?.password).not.toBe(userData.password);
  });
  test('should throw error when input is not provided', async () => {
    const user = new User({ username: null, password: null });
    user.save().catch(e => expect(e).toBeTruthy());
  });
});

describe('validating passwords', () => {
  test('should validate matching passwords', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new User(userData);
    await user.save();
    user.validatePassword(userData.password).then(match => expect(match).toBe(true));
  });
  test('should NOT validate different passwords', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new User(userData);
    await user.save();
    user.validatePassword(faker.internet.password()).then(match => expect(match).toBe(false));
  });
});

describe('generating JWT', () => {
  test('should generate JWT', async () => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new User(userData);
    await user.save();
    const token = await user.getSignedToken();
    expect(token).not.toBeNull();
  });
});
