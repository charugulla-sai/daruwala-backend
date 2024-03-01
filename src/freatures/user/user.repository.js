import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';

// create user model
const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {
  async addUser(newUser) {
    try {
      if (!newUser) {
        throw new Error('Something wrong with DB. User data not received.');
      }
      // 1. check if user already exists
      const existedUser = await UserModel.findOne({ email: newUser.email });
      if (existedUser) {
        throw new Error(
          'User with this email already Exists. Please try with different email.'
        );
      }
      // 2. Add user into Database
      const user = new UserModel(newUser);
      return await user.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getUser(email, password) {
    try {
      const user = await UserModel.findOne({
        email: email,
        password: password,
      });
      if (!user) {
        throw new Error('Invalid User Credentials.');
      }
      return user;
    } catch (err) {
      console.log('hi');
      throw new Error(err.message);
    }
  }
}
