import express from 'express';
import { isCustomer } from '../../middlewares/jwt.middleware.js';
import CartController from './cart.controller.js';

// initialize express router
const cartRouter = express.Router();

const cartController = new CartController();

// Routes
cartRouter.post('/:productId', isCustomer, cartController.addToCart);

export default cartRouter;
