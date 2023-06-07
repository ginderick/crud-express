import UsersService from '../../services/users';
import { NextFunction, Request, Response, Router } from 'express';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersService = new UsersService();
      const users = await usersService.getUsers();
      return res.status(200).json(users);
    } catch (error) {}
  });
};

export default users;
