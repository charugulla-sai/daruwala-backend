// import express from express
import express from 'express';
import ProductController from './product.controller.js';

// initialize express router
const productRouter = express.Router();

// Create Instance of Product Controller
const productController = new ProductController();

// routes
productRouter.get('/', productController.getAllProducts);
productRouter.get('/filter', productController.filterProducts);

export default productRouter;
