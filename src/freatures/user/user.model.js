export default class UserModel {
  constructor(id, email, password, type) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.type = type;
  }

static getAll(){
  return users
}

  static getUser(email, password, type) {
    if (email && password && type) {
      const user = users.find((user) => {
        return (
          user.email === email &&
          user.password === password &&
          user.type === type
        );
      });
      return user;
    }
  }
}

let users = [
  new UserModel(1, 'seller@gmail.com', '1234', 'Seller'),
  new UserModel(2, 'customer@gmail.com', '2715', 'Customer'),
];
