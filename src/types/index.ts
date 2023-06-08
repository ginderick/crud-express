import { AnyZodObject } from 'zod';

export type User = {
  name: string;
  age: number;
  email: string;
};

export type UserDatabase = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export type RequestValidator = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
};
