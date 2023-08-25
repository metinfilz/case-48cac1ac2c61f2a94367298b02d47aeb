import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    description: 'Get Books'
  });
});

router.get('/:book_id', (req, res) => {
  const {book_id} = req.params;
  res.json({
    description: 'Get Book',
    params: {
      book_id
    }
  });
});

router.post('/', (req, res) => {
  const {name} = req.body;
  res.json({
    description: 'Create Book',
    req_body: {name}
  });
});

export default router;
