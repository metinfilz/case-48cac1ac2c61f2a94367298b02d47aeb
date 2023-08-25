import express from 'express';

const router = express.Router();

import actions from './actions';

router.use(actions);

router.get('/', (req, res) => {
  res.json({
    description: 'Get Users',
    res_body: {}
  });
});

router.get('/:user_id', (req, res) => {
  const {user_id} = req.params;
  res.json({
    description: 'Get User',
    params: {user_id},
    res_body: {}
  });
});

router.post('/', (req, res) => {
  const {name} = req.body;
  res.json({
    description: 'Create User',
    req_body: {
      name
    },
    res_body: {}
  });
});

export default router;
