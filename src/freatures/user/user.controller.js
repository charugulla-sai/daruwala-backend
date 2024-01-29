import UserModel from './user.model.js';


export default class UserController {
  signIn(req, res) {
    const { email, password } = req.body;
    const result=UserModel.signIn(email,password);
    if(result.email && result.password){
      res.status(200).send(result)
    }else{
      res.status(400).send(result)
    }
  }
}
