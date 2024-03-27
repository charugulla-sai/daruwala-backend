import mongoose from 'mongoose';
import { cartSchema } from './cart.schema.js';
import { productSchema } from '../product/product.schema.js';

const CartModel = mongoose.model('Cart', cartSchema);
const ProductModel = mongoose.model('Product', productSchema);

export default class CartRepository {
  async getAll() {
    try {
      const cartItems = await CartModel.find({});
      const productIds = cartItems.map((cartItem) => cartItem.productId);
      const productsInCart = await ProductModel.find({
        _id: { $in: productIds },
      });
      const cartProducts = cartItems.map((cartItem) => {
        const product = productsInCart.find(
          (product) => cartItem.productId.equals(product._id)
        );
        return { ...product.toObject(), quantity: cartItem.quantity };
      });
      return cartProducts;
    } catch (err) {
      return new Error(err.message);
    }
  }

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

  async delete(productId, userId) {
    try {
      // check if product available in product collection
      const existingProduct = await ProductModel.findById(
        new mongoose.Types.ObjectId(productId)
      );
      if (!existingProduct) {
        throw new Error('Product not found');
      }
      // Check if user already added the product to cart.
      const productExistInCart = await CartModel.findOne({
        productId: new mongoose.Types.ObjectId(productId),
        userId: new mongoose.Types.ObjectId(userId),
      });

      if (!productExistInCart) {
        throw new Error(
          'Product is not yet added in Cart. \n Please add it now.'
        );
      }

      return await CartModel.deleteOne({
        _id: new mongoose.Types.ObjectId(productExistInCart._id),
      });
    } catch (err) {
      return new Error(err.message);
    }
  }
}
