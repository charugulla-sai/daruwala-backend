// import { ObjectId } from 'mongodb';
// import { getDB } from '../../config/mongodb.js';
import mongoose from 'mongoose';
import { productSchema } from './product.schema.js';
import { reviewSchema } from './review.schema.js';

const ProductModel = mongoose.model('Product', productSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);

export default class ProductRepository {
  async add(product) {
    try {
      if (!product) {
        throw new Error('Product is not received to store in DB.');
      }
      const newProduct = new ProductModel(product);
      return await newProduct.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAll() {
    try {
      return await ProductModel.find({});
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async get(productId) {
    try {
      const product = await ProductModel.findById({
        _id: new mongoose.Types.ObjectId(productId),
      });
      return product;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async filter(minValue, maxValue, category) {
    const query = {};
    if (minValue) {
      query.price = { $gte: parseFloat(minValue) };
    }
    if (maxValue) {
      query.price = { ...query.price, $lte: parseFloat(maxValue) };
    }
    if (category) {
      query.category = category;
    }
    try {
      const filteredProducts = await ProductModel.find(query);
      return filteredProducts;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async rateProduct(productId, userId, productRating, review) {
    try {
      // 1. check if product exists
      const existingProduct = await ProductModel.findById(productId);
      if (!existingProduct) {
        throw new Error('Product not found');
      }
      // 2. check if user already rated the product
      const userReview = await ReviewModel.findOne({
        productId: new mongoose.Types.ObjectId(productId),
        userId: new mongoose.Types.ObjectId(userId),
      });

      if (!userReview) {
        const newReview = new ReviewModel({
          productId: new mongoose.Types.ObjectId(productId),
          userId: new mongoose.Types.ObjectId(userId),
          rating: productRating,
          review: review,
        });
        await newReview.save();
      } else {
        userReview.rating = productRating;
        userReview.review = review;
        await userReview.save();
      }
      // OPTIONAL
      // 3. get all the reviews of that product and update in the review field of product
      const allProductReviews = await ReviewModel.find({
        productId: new mongoose.Types.ObjectId(productId),
      });

      await ProductModel.updateOne(
        { _id: new mongoose.Types.ObjectId(productId) },
        {
          $set: { reviews: [...allProductReviews] },
        }
      );
      return await ProductModel.findById(productId);
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }
}
