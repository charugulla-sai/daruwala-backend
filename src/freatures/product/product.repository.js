import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';

export default class ProductRepository {
  constructor() {
    this.collection = 'products';
  }
  async getAll() {
    try {
      // 1. get the db
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);
      // 3. get and return all the products from the db
      return await collection.find({}).toArray();
    } catch (err) {
      console.log(err);
    }
  }

  async get(productId) {
    try {
      // 1. get the db
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);
      //  3. fetch product from db using product id
      const product = await collection.findOne({
        _id: new ObjectId(productId),
      });
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async add(product) {
    try {
      // 1. get the db
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);
      // 3. add the product to db and return the product
      return await collection.insertOne(product);
    } catch (err) {
      console.log(err);
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
      // 1. get the db
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);
      // 3. apply filter and fetch the products from db
      const filteredProducts = await collection.find(query).toArray();
      return filteredProducts;
    } catch (err) {
      console.log(err);
    }
  }
}
