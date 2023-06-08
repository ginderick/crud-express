import { User } from '../types';

export default class UsersService {
  private usersList: User[];

  constructor() {
    this.usersList = [
      {
        id: 1,
        name: 'Harper Sullivan',
        age: 20,
        email: 'harpersullivan@gmail.com',
      },
      {
        id: 2,
        name: 'Leo Thompson',
        age: 18,
        email: 'leothompson@gmail.com',
      },
      {
        id: 3,
        name: 'Owen Mitchell',
        age: 22,
        email: 'owenmitchell@gmail.com',
      },
      {
        id: 4,
        name: 'Ava Reynolds',
        age: 28,
        email: 'avareynolds@gmail.com',
      },
    ];
  }
  public async getUsers() {
    return this.usersList;
  }

  public async addUser(user: User) {
    this.usersList.push(user);
    return;
  }
}
