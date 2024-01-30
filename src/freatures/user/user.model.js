export default class UserModel {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static signIn(email, password) {
    if (email && password) {
      const user = users.find((user) => {
        return user.email === email && user.password === password;
      });
      return user;
    }
  }
}

let users = [
  new UserModel('satya@gmail.com', '1234'),
  new UserModel('sai@gmial.com', '2715'),
];
