import Razorpay from 'razorpay';

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
      const order =await instance.orders.create(options)
      res.send(order)
    } catch (err) {
      res.send(err);
    }
  }
}
