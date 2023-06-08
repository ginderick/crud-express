import express from 'express';
import 'reflect-metadata';
import request from 'supertest';
import { clearData, seeder } from '../../seeder';
import { user } from '../../utils/utils';

let server;
beforeAll(async () => {
  const app = express();
  await require('../../../src/loaders').default({ expressApp: app });
  server = app.listen(0);

  //seed users database
  await seeder();
});

afterAll(async () => {
  await clearData();
  await server.close();
});

describe('GET /users', () => {
  it('should return status code 200 for successfully getting all users', async () => {
    const res = await request(server).get('/users');
    expect(res.status).toBe(200);
  });
});

describe('GET /users/:id', () => {
  it('should return status code 200 for successfully a user', async () => {
    const res = await request(server).get('/users/2');
    expect(res.status).toBe(200);
  });
  it('should return status 404 when user is not found', async () => {
    const res = await request(server).get('/users/3');

    expect(res.status).toBe(404);
  });
});

describe('POST /users', () => {
  it('should return status code 201 for successfully a adding user', async () => {
    const res = await request(server).post('/users').send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
  });
});

describe('PATCH /users/1', () => {
  it('should return status code 200 for successfully a updating user with id 1', async () => {
    const res = await request(server).patch('/users/1').send(user);
    expect(res.status).toBe(200);
  });
});

describe('DELETE /users/1', () => {
  it('should return status code 204 for successfully a deleting user with id 1', async () => {
    const res = await request(server).delete('/users/1');
    expect(res.status).toBe(204);
  });
});
