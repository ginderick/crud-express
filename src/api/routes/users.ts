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

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id!;
      const user = await usersService.getUser(id);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {}
  });

  route.patch(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id!;
        const userBody = req.body as User;
        const user = await usersService.updateUser(id, userBody);
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {}
    }
  );
};

export default users;
