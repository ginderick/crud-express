import UsersService from '../../services/users';
import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../../types';

const route = Router();

// Create an instance of the UsersService class to persist in-memory store
const usersService = new UsersService();

const users = (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getUsers();
      return res.status(200).json(users);
    } catch (error) {}
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as User;
      await usersService.addUser(user);
      return res
        .status(201)
        .json({ message: 'User has been successfully added' });
    } catch (error) {}
  });
};

export default users;
