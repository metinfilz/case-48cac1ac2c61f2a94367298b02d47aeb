import request from 'supertest';
import app from '../src/app';

describe('User Routes', () => {
  test('Get Users', async () => {
    const res = await request(app).get('/users');
    expect(res.body).toEqual({description: 'Get Users', res_body: {}});
  });
  test('Get User', async () => {
    const user_id = '4';
    const res = await request(app).get(`/users/${user_id}`);
    expect(res.body).toEqual({description: 'Get User', params: {user_id}, res_body: {}});
  });
  test('Create User', async () => {
    const user_name = 'sam baggins';
    const res = await request(app).post('/users').send({name: user_name});
    expect(res.body).toEqual({description: 'Create User', req_body: {name: user_name}, res_body: {}});
  });
  test('Borrow Book', async () => {
    const user_id = '4';
    const book_id = '5';
    const res = await request(app).post(`/users/${user_id}/borrow/${book_id}`);
    expect(res.body).toEqual({description: 'Borrow Book', params: {user_id, book_id}, req_body: {}, res_body: {}});
  });
  test('Return Book', async () => {
    const user_id = '6';
    const book_id = '5';
    const res = await request(app).post(`/users/${user_id}/return/${book_id}`);
    expect(res.body).toEqual({
      description: 'Return Book',
      params: {user_id, book_id},
      req_body: {},
      res_body: {score: "10"}
    });
  });
});
