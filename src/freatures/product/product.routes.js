// import express from express
import express from 'express';
import ProductController from './product.controller.js';

// initialize express router
const router = express.Router();

const productController = new ProductController();

// routes
router.get('/', productController.getAllProducts);

export default router;
