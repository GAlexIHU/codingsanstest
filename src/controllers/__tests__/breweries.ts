import 'jest';
import faker from 'faker';
import request from 'supertest';
import { Application } from 'express';

import { createApp } from '../../app';

let app: Application;
let token: string;

beforeAll(async done => {
  app = await createApp();
  // Creating new user to get token to authenticate
  const userData = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
  try {
    const resp = await request(app)
      .post('/api/v1/authenticate/register')
      .send(userData);
    token = resp.body.token;
    done();
  } catch (error) {
    done(error);
  }
});

describe('GET /breweries with auth', () => {
  test('w/ query, status and resp body', async done => {
    request(app)
      .get('/api/v1/breweries?query=dog')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('data');
        expect(res.body.success).toEqual(true);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });
  test('no query, status and resp body', async done => {
    request(app)
      .get('/api/v1/breweries')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('data');
        expect(res.body.success).toEqual(true);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });
});

describe('GET /breweries No auth', () => {
  test('w/ query no auth', async done => {
    request(app)
      .get('/api/v1/breweries?query=dog')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).not.toBeNull();
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toBe(false);
        done();
      });
  });
  test('no query no auth', async done => {
    request(app)
      .get('/api/v1/breweries')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).not.toBeNull();
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toBe(false);
        done();
      });
  });
});
