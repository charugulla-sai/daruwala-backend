// import express from express
import express from 'express';
import ProductController from './product.controller.js';
import { jwtAuth } from '../../middlewares/jwt.middleware.js';

// initialize express router
const productRouter = express.Router();

// Create Instance of Product Controller
const productController = new ProductController();

// routes
productRouter.get('/', productController.getAllProducts);
productRouter.post('/product',productController.addProduct)
productRouter.get('/filter',jwtAuth, productController.filterProducts);

export default productRouter;
