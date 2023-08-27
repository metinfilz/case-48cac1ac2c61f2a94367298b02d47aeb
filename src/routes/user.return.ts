import { Router } from 'express';
import * as returnBookController from '../controllers/user.return';

const router = Router({ mergeParams: true });

router.post('/:book_id', (req, res, next) => {
  const { book_id, user_id } = req.params as typeof req.params & { user_id: string };
  const { score } = req.body;
  const payload = { book_id, user_id, score };
  returnBookController
    .returnBook(payload)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

export default router;
