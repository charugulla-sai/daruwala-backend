import cartModel from './cart.model.js';
import CartRepository from './cart.repository.js';

const cartRepository = new CartRepository();

export default class CartController {
  async addToCart(req, res) {
    try {
      const productId = req.params.productId;
      const userId = res.locals.tokenPayload.id;
      const cartProduct = new cartModel(productId, userId);
      const response = await cartRepository.add(cartProduct);
      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  }

  async deleteFromCart(req,res){
    try {
      const productId = req.params.productId;
      const userId = res.locals.tokenPayload.id;
      const response = await cartRepository.delete(productId, userId)
      res.status(200).send(response)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}
