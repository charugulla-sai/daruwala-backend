// import express from express
import express from 'express';
import ProductController from './product.controller.js';
import { isCustomer, isSeller } from '../../middlewares/jwt.middleware.js';

// initialize express router
const productRouter = express.Router();

// Create Instance of Product Controller
const productController = new ProductController();

// routes
productRouter.get('/', productController.getAllProducts);
productRouter.get('/filter', productController.filterProducts);
productRouter.post('/addproduct', isSeller, productController.addProduct);
productRouter.post('/rateproduct/:id', isCustomer, productController.rateProduct);
productRouter.get('/:id', productController.getOneProduct);

export default productRouter;
