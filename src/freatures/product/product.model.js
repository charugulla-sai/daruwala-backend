import UserModel from '../user/user.model.js';

export default class ProductModel {
  constructor(title, description, imageURL, category, price, sizes) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static rateProduct(userId, productId, rating) {
    // 1.Validate user
    const user = UserModel.getAll().find((user) => user.id == userId);
    if (!user) {
      return 'User Not Found';
    }
    // 2.Validate Product
    const product = products.find((product) => product.id == productId);
    if (!product) {
      return 'Product Not Found';
    }
    // 3.check if ratings array exists in product
    const ratings = product.ratings;
    const ratingObject = { userId: userId, rating: rating };
    if (!ratings) {
      product.ratings = [];
      product.ratings.push(ratingObject);
    } else {
      // 4.check if this user has already rated
      const existingRatingIndexOfUser = ratings.indexOf(
        (userRating) => userRating.userId == userId
      );
      if (!existingRatingIndexOfUser) {
        ratings.push(ratingObject);
      } else {
        ratings[existingRatingIndexOfUser] = ratingObject;
      }
    }
  }

}

