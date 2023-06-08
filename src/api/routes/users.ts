import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import { UserSchema } from '../../schema/UserScehma';
import UsersService from '../../services/users';
import { User } from '../../types';
import middlewares from '../middlewares';

const route = Router();

const users = (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersService = Container.get(UsersService);
      const users = await usersService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  });

  route.post(
    '/',
    middlewares.requestValidator({
      body: UserSchema,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.body as User;
        const usersService = Container.get(UsersService);
        await usersService.addUser(user);
        return res
          .status(201)
          .json({ message: 'User has been successfully added' });
      } catch (error) {
        return next(error);
      }
    }
  );

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id!;
      const usersService = Container.get(UsersService);
      const user = await usersService.getUser(id);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return next(error);
    }
  });

  route.patch(
    '/:id',
    middlewares.requestValidator({
      body: UserSchema,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id!;
        const userBody = req.body as User;
        const usersService = Container.get(UsersService);
        const user = await usersService.updateUser(id, userBody);
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        return next(error);
      }
    }
  );

  route.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id!;
        const usersService = Container.get(UsersService);
        const user = await usersService.deleteUser(id);
        if (user) {
          return res.status(204).json({ message: 'User successfully deleted' });
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        return next(error);
      }
    }
  );
};

export default users;
