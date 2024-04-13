import express from 'express';
import dotenv from 'dotenv/config';
import ProductRouter from './src/freatures/product/product.routes.js';
import userRouter from './src/freatures/user/user.routes.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import cors from 'cors';
import cartRouter from './src/freatures/cart/cart.routes.js';
import orderRouter from './src/freatures/order/order.routes.js';

// Create server
const server = express();

server.use(cors());
server.use(express.json());

// Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to E-commerse application');
});

// Redirect product related routes to product.routes.js file
server.use('/api/products', (req, res) => {
  ProductRouter(req, res);
});
// Redirect user related routes to user.routes.js file
server.use('/user', userRouter);
// Redirect cart related routes to cart.routes.js file
server.use('/api/cart', cartRouter);
// Redirect order related routes to order.routes.js file
server.use('/order', orderRouter);

// Add listner
const port = process.env.PORT;
server.listen(port || 3000, () => {
  console.log(`Server is started listning at port ${port ? port : 3000}`);
  connectUsingMongoose();
  // connectToMongoDB();
});
