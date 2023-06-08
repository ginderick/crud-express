import { User, UserDatabase } from '../types';

export class InMemoryDatabase {
  private database: UserDatabase[];
  private nextId: number;
  private static instance: InMemoryDatabase;

  constructor() {
    this.database = [];
    this.nextId = 1;
  }

  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  public async getAll() {
    return this.database;
  }

  public async getUser(id: number) {
    const user = this.findEntryById(id);
    return user;
  }

  public async create(user: User) {
    const id = this.nextId++;
    this.database.push({ id, ...user });
    return user;
  }

  public async update(id: number, user: User) {
    const index = this.findIndexById(id);

    if (index !== -1) {
      this.database[index] = { id, ...user };
      return this.database[index];
    }
    return;
  }

  public async delete(id: number) {
    const index = this.findIndexById(id);
    if (index !== -1) {
      const result = this.database.splice(index, 1);
      return id;
    } else {
      return;
    }
  }

  private findIndexById(id: number): number {
    return this.database.findIndex((entry) => entry.id === id);
  }

  private findEntryById(id: number): UserDatabase | undefined {
    const result = this.database.find((user) => user.id === id);
    return result;
  }

  public clear() {
    this.database = [];
  }
}
