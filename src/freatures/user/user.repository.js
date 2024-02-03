import { getDB } from '../../config/mongodb.js';
import UserModel from './user.model.js';

export default class UserRepository {
  constructor() {
    this.collection = 'users';
  }

  async addUser(newUser) {
    try {
      // 1. get the database
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);

      // 3. Insert the new user into db
      return await collection.insertOne(newUser);
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(email, password) {
    try {
      // 1. get the database
      const db = getDB();
      // 2. get collection
      const collection = db.collection(this.collection);
      // 3. find the user by email and password
      return await collection.findOne({ email: email, password: password });
    } catch (err) {
      console.log(err);
    }
  }
}
