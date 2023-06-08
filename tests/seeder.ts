import { InMemoryDatabase } from '../src/database';

export const seedData = [
  { name: 'John Doe', age: 30, email: 'johndoe@gmail.com' },
  { name: 'Jane Smith', age: 25, email: 'janesmith@gmail.com' },
];

export const seeder = async () => {
  try {
    const db = InMemoryDatabase.getInstance();

    // Perform seeding logic
    for (const data of seedData) {
      await db.create(data);
    }
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

export const clearData = async () => {
  try {
    const db = InMemoryDatabase.getInstance();
    db.clear();

    console.log('Clearing complete.');
  } catch (error) {
    console.error('Clearing failed:', error);
  }
};
