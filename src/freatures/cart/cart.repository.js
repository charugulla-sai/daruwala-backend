import mongoose from 'mongoose';
import { cartSchema } from './cart.schema.js';
import { productSchema } from '../product/product.schema.js';

const CartModel = mongoose.model('Cart', cartSchema);
const ProductModel = mongoose.model('Product', productSchema);

export default class CartRepository {
  async add(cartProduct) {
    try {
      // check if product available in product collection
      const existingProduct = await ProductModel.findById(
        new mongoose.Types.ObjectId(cartProduct?.productId)
      );
      if (!existingProduct) {
        throw new Error('Product not found');
      }
      // Check if user already added the product to cart.
      const productExistInCart = await CartModel.findOne({
        productId: new mongoose.Types.ObjectId(cartProduct?.productId),
        userId: new mongoose.Types.ObjectId(cartProduct?.userId),
      });

      if (!productExistInCart) {
        const newCartItem = new CartModel({
          productId: new mongoose.Types.ObjectId(cartProduct?.productId),
          userId: new mongoose.Types.ObjectId(cartProduct?.userId),
          quantity: 1,
        });
        return await newCartItem.save();
      } else {
        productExistInCart.quantity = productExistInCart.quantity + 1;
        return await productExistInCart.save();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
