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

  public async getUser(name: string) {
    const user = this.findEntryByName(name);
    return user;
  }

  public async create(user: User) {
    const id = this.nextId++;
    this.database.push({ id, ...user });
    return user;
  }

  public update(id: number, user: User): void {
    const index = this.findIndexById(id);
    if (index) {
      this.database[index] = { id, ...user };
    } else {
      throw new Error(`Entry with ID '${id}' does not exist in the database.`);
    }
  }

  public delete(id: number): void {
    const index = this.findIndexById(id);
    if (index !== -1) {
      this.database.splice(index, 1);
    } else {
      throw new Error(`Entry with ID '${id}' does not exist in the database.`);
    }
  }

  private findEntryByName(name: string): UserDatabase | undefined {
    return this.database.find((user) => user.name === name);
  }

  private findIndexById(id: number): number {
    return this.database.findIndex((entry) => entry.id === id);
  }
}
