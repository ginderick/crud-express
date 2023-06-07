import { NextFunction, Request, Response, Router } from 'express';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ message: 'Hello world' });
    } catch (error) {}
  });
};

export default users;
