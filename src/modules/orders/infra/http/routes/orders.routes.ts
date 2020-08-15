import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

const productSchema = Joi.object({
  id: Joi.string().uuid().required(),
  quantity: Joi.number().required(),
});

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.array().items(productSchema).min(1).required(),
    },
  }),
  ordersController.create,
);

ordersRouter.get(
  '/:orderId',
  celebrate({
    [Segments.PARAMS]: {
      orderId: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

export default ordersRouter;
