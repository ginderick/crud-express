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
});
