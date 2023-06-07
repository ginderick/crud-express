export default class UsersService {
  private usersList: string[];

  constructor() {
    this.usersList = [
      'Harper Sullivan',
      'Leo Thompson',
      'Ava Reynolds',
      'Owen Mitchell',
      'Stella Foster',
      'Caleb Hayes',
      'Ruby Porter',
      'Isaac Morgan',
      'Grace Ramirez',
      'Elijah Cooper',
      'Mia Peterson',
      'Ethan Brooks',
      'Olivia Price',
      'Noah Campbell',
      'Sophia Turner',
    ];
  }
  public async getUsers() {
    return this.usersList;
  }

  public async addUser(user: string) {
    this.usersList.push(user);
    return;
  }
}
