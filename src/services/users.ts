import { InMemoryDatabase } from '../database';
import { User } from '../types';

export default class UsersService {
  public async getUsers() {
    const database = InMemoryDatabase.getInstance();
    return database.getAll();
  }

  public async addUser(user: User) {
    const database = InMemoryDatabase.getInstance();
    const userResult = await database.create(user);
    return userResult;
  }

  public async getUser(id: number) {
    const database = InMemoryDatabase.getInstance();
    const user = await database.getUser(id);
    return user;
  }

  public async updateUser(id: number, data: any) {
    const database = InMemoryDatabase.getInstance();
    const user = await database.update(id, data);
    return user;
  }
}
