import express from 'express';
import dotenv from 'dotenv/config';
import ProductRouter from './src/freatures/product/product.routes.js';
import userRouter from './src/freatures/user/user.routes.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import cors from 'cors';

// Create server
const server = express();

server.use(cors());
server.use(express.json());

// Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to E-commerse application');
});

// Redirect product related routes to product.routes.js file
server.use('/api/products', ProductRouter);
// Redirect user related routes to user.routes.js file
server.use('/user', userRouter);

// Add listner
const port = process.env.PORT;
server.listen(port || 3000, () => {
  console.log(`Server is started listning at port ${port ? port : 3000}`);
  connectUsingMongoose();
  // connectToMongoDB();
});
