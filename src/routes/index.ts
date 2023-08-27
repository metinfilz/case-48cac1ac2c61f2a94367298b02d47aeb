import express from 'express';
import users from './users';
import books from './books';

const router = express.Router();

router.get('/', (req, res) => res.json({ service: 'library-api', status: true }));
router.use('/users', users);
router.use('/books', books);

export default router;
