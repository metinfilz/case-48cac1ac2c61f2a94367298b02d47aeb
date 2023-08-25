import {Router} from 'express';

const router = Router();

router.post('/:user_id/borrow/:book_id', (req, res) => {
  const {user_id, book_id} = req.params;
  res.json({
    description: 'Borrow Book',
    params: {
      user_id, book_id

    },
    req_body: {},
    res_body: {}

  });
});

router.post('/:user_id/return/:book_id', (req, res) => {
  const {user_id, book_id} = req.params;
  res.json({
    description: 'Return Book',
    params: {
      user_id, book_id,
    },
    req_body: {},
    res_body: {score: "10"}
  });
});


export default router;
