import express from 'express';
import OrderController from './order.controller.js';
import { isCustomer } from '../../middlewares/jwt.middleware.js';

const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.post('/', isCustomer, orderController.createOrder);
orderRouter.post('/validate', isCustomer, orderController.validateOrder);
orderRouter.get('/', isCustomer, orderController.getAllOrders);

export default orderRouter;
