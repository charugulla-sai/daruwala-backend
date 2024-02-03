import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';

const userRepository = new UserRepository();
export default class UserController {
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = new UserModel(name, email, password, type);
    const result = await userRepository.addUser(user);
    if (!result) {
      throw new Error('User not added to Database');
    }
    res.status(201).send(result);
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    const user = await userRepository.getUser(email, password);
    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }
    // generate the jwt token using .sign method provided by jsonwebtoken package
    const token = jwt.sign(
      { email: user.email, type: user.type },
      'PO79tkUO6ScSMO4uIH75zlfv6Oeb3n57',
      { expiresIn: '1hr' }
    );
    // send the token to client when he tries to login with correct credentials
    return res.status(200).send(token);
  }
}
