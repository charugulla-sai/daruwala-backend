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
      if (!user) {
        return 'Bad Credentials';
      }
      return user;
    } else {
      return 'Data of Email and Password is must and should';
    }
  }
}

let users = [
  new UserModel('satya@gmail.com', '1234'),
  new UserModel('sai@gmial.com', '2715'),
];
