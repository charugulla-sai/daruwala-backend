// Import express
import express from 'express';
// import dotenv from 'dotenv/config';
import ProductRouter from './src/freatures/product/product.routes.js';

// Create server
const server = express();

// Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to E-commerse application');
});

// Redirect product related routes to product.routes.js file
server.use('/api/products', ProductRouter);

// Add listner
const port = process.env.PORT;
server.listen(port || 3000, () => {
  console.log(`Server is started listning at port ${port ? port : 3000}`);
});
