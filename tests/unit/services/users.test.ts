import UsersService from '../../../src/services/users';
import { clearData, seedData, seeder } from '../../seeder';

beforeAll(async () => {
  //clear database first before seeding users
  await clearData();
  await seeder();
});

describe('User service', () => {
  it('should return all users', async () => {
    const usersService = new UsersService();

    const users = await usersService.getUsers();

    for (const [index, value] of users.entries()) {
      expect(value.name).toEqual(seedData[index].name);
    }

    expect(users.length).toEqual(seedData.length);
  });

  it('should return get a user with id 1', async () => {
    const usersService = new UsersService();
    const id = 1;
    const user = await usersService.getUser(id);

    expect(user!.name).toEqual(seedData[0].name);
  });

  it('should return an updated user details with id 1', async () => {
    const usersService = new UsersService();
    const id = 1;
    const data = {
      name: 'Gin Derick Magno',
      age: 22,
      email: 'ginderick@gmail.com',
    };
    const user = await usersService.updateUser(id, data);

    expect(user!.name).toEqual(data.name);
  });

  it('should return the created user', async () => {
    const usersService = new UsersService();
    const data = {
      name: 'Gin Derick Magno',
      age: 22,
      email: 'ginderick@gmail.com',
    };
    const user = await usersService.addUser(data);

    expect(user!.name).toEqual(data.name);
  });

  it('should return the deleted user with id 1', async () => {
    const usersService = new UsersService();
    const id = 1;
    const userId = await usersService.deleteUser(id);

    expect(userId).toEqual(id);
  });
});
