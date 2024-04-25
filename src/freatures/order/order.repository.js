import mongoose from 'mongoose';
import { orderSchema } from './order.schema.js';
import { productSchema } from '../product/product.schema.js';

const OrderModel = mongoose.model('Order', orderSchema);
const ProductModel = mongoose.model('Product', productSchema);
export default class OrderRepository {
  async getAllOrders(userId) {
    try {
      const orderItems = await OrderModel.find({ userId: userId });
      return orderItems;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async add(order) {
    try {
      const newOrderItem = new OrderModel(order);
      return await newOrderItem.save();
    } catch (err) {
      console.log(err);
    }
  }
}
