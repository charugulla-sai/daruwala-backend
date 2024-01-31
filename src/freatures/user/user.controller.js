import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';

export default class UserController {
  signIn(req, res) {
    const { email, password, type } = req.body;
    const result = UserModel.getUser(email, password, type);
    if (!result) {
      return res.status(400).send('Invalid Credentials');
    }
    // generate the jwt token using .sign method provided by jsonwebtoken package
    const token = jwt.sign(
      { email: result.email, type: result.type },
      'PO79tkUO6ScSMO4uIH75zlfv6Oeb3n57',
      { expiresIn: 60 }
    );
    // send the token to client when he tries to login with correct credentials
    return res.status(200).send(token);
  }
}
