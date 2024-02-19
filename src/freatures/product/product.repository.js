// import { ObjectId } from 'mongodb';
// import { getDB } from '../../config/mongodb.js';
import mongoose from 'mongoose';
import { productSchema } from './product.schema.js';

const ProductModel = mongoose.model('Product', productSchema);

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

  async rateProduct(productId, userId, productRating) {
    try {
      // 1. get the db
      const db = getDB();
      // 2. get he collection
      const collection = db.collection(this.collection);
      // 3. Check if user already rated the product
      const productWithMyUserRating = await collection.findOne({
        _id: new ObjectId(productId),
        ratings: { $elemMatch: { userId: new ObjectId(userId) } },
      });

      if (!productWithMyUserRating) {
        // 4. if user not rated earlier, add the rating object to ratings array in the product
        const updatedProduct = await collection.updateOne(
          { _id: new ObjectId(productId) },
          {
            $push: {
              ratings: { userId: new ObjectId(userId), rating: productRating },
            },
          }
        );
        return updatedProduct;
      }
      // 5. if user already rated earlier, update the rating object in the ratings array
      return await collection.updateOne(
        {
          _id: new ObjectId(productId),
          'ratings.userId': new ObjectId(userId),
        },
        { $set: { 'ratings.$.rating': productRating } }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
