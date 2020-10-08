import 'jest';
import faker from 'faker';
import request from 'supertest';
import { Application } from 'express';

import { createApp } from '../../app';

let app: Application;

jest.setTimeout(10000);

beforeAll(async () => {
  app = await createApp();
});

describe('POST /authenticate', () => {
  test('POST /authenticate/register', async done => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    request(app)
      .post('/api/v1/authenticate/register')
      .send(userData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).not.toBeNull();
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('token');
        expect(res.body.success).toBe(true);
        expect(res.body.token).not.toBeNull();
        done();
      });
  });
  test('POST /authenticate/login', async done => {
    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    // const token = await request(app).post()
    request(app)
      .post('/api/v1/authenticate/register')
      .send(userData)
      .expect(201)
      .end((err, _) => {
        if (err) return done(err);
        request(app)
          .post('/api/v1/authenticate/login')
          .send(userData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).not.toBeNull();
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('token');
            expect(res.body.success).toBe(true);
            expect(res.body.token).not.toBeNull();
            done();
          });
      });
  });
});
