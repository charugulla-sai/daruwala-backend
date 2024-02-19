import UserModel from '../user/user.model.js';

export default class ProductModel {
  constructor(title, description, imageUrl, category, price, stock) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.ratings = [];
  }
}
