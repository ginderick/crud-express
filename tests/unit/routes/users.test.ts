import express from 'express';
import 'reflect-metadata';
import request from 'supertest';

let server;
beforeEach(async () => {
  const app = express();
  await require('../../../src/loaders').default({ expressApp: app });
  server = app.listen(0);
});

afterEach(async () => {
  await server.close();
});

describe('GET /users', () => {
  it('should return status code 200 for successfully getting all users', async () => {
    const res = await request(server).get('/users');
    expect(res.status).toBe(200);
  });
});
