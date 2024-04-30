import Razorpay from 'razorpay';
import crypto from 'crypto';
import OrderRepository from './order.repository.js';
import CartRepository from '../cart/cart.repository.js';

const orderRepository = new OrderRepository();
const cartRepository = new CartRepository();
export default class OrderController {
  async createOrder(req, res) {
    try {
      // 1. Create instance of razorpay
      var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      // 2. Create Order
      var options = req.body;
      const order = await instance.orders.create(options);
      res.status(200).send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async validateOrder(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount } =
      req.body;
    const userId = res.locals.tokenPayload.id;
    try {
      // generate a hmac-sha25 code
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generated_signature = hmac.digest('hex');
      // check if generated signature is matchng razorpay signature received from client.
      if (generated_signature === razorpay_signature) {
        // res.status(200).send({
        //   message: 'Transaction is successful',
        //   orderId: razorpay_order_id,
        //   paymentId: razorpay_payment_id,
        //   generated_signature,
        //   client_signature: razorpay_signature,
        // });
        // get all cart products
        const cartProducts = await cartRepository.getAll(userId);
        // save to database(order collection)
        const orderResponse = await orderRepository.add({
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          products: cartProducts,
          userId: userId,
          orderAmount: amount,
        });
        res.status(200).send({ message: 'Payment succesfull...!' });
      } else {
        res.status(400).send({
          message: 'Transaction is not legit...!',
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          generated_signature,
          client_signature: razorpay_signature,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllOrders(req, res) {
    try {
      const userId = res.locals.tokenPayload.id;
      const allOrders = await orderRepository.getAllOrders(userId);
      res.status(200).send(allOrders);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }
}
