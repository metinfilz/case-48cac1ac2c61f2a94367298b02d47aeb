import { Router } from 'express';
import * as bookController from '../controllers/book';

const router = Router();

router.post('/', (req, res, next) => {
  const { name } = req.body;
  const payload = { name: name };
  bookController
    .create(payload)
    .then(() => res.status(201).end())
    .catch((err) => next(err));
});
router.get('/:book_id', async (req, res, next) => {
  const { book_id } = req.params;
  const payload = { id: book_id };
  bookController
    .findOne(payload)
    .then((book) => res.json(book))
    .catch((err) => next(err));
});
router.get('/', (_, res, next) => {
  bookController
    .findAll()
    .then((books) => res.json(books))
    .catch((err) => next(err));
});

export default router;
