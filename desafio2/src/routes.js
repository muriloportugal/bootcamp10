import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

function checkRecipientId(req, res, next) {
  if (!req.params.id){
    return res.status(400).json({ error: 'Recipient ID is required' });
  }
  return next();
}

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', checkRecipientId, RecipientController.update);

export default routes;
