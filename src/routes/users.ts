import { Router } from 'express';
import * as userController from '../controllers/user';
import borrowRouter from './user.borrow';
import returnRouter from './user.return';

const router = Router();

router.post('/', (req, res, next) => {
  const { name } = req.body;
  const payload = { name };
  userController
    .create(payload)
    .then(() => res.status(201).end())
    .catch((err) => next(err));
});
router.get('/:user_id', (req, res, next) => {
  const { user_id } = req.params;
  userController
    .findOne({ id: user_id })
    .then((user) => res.json(user))
    .catch((err) => next(err));
});
router.use('/:user_id/borrow', borrowRouter);
router.use('/:user_id/return', returnRouter);
router.get('/', (_, res, next) => {
  userController
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

export default router;
