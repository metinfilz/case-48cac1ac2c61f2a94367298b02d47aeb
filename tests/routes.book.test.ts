import request from 'supertest';

import app from '../src/app';

describe('Book Routes', () => {
  test('Get Books', async () => {
    const res = await request(app).get('/books');
    expect(res.body).toEqual({description: 'Get Books'});
  });
  test('Get Book', async () => {
    const book_id = '6';
    const res = await request(app).get(`/books/${book_id}`);
    expect(res.body).toEqual({description: 'Get Book', params: {book_id: book_id}});
  });
  test('Create Book', async () => {
    const name = 'Neuromancer';
    const res = await request(app).post('/books').send({name});
    expect(res.body).toEqual({description: 'Create Book', req_body: {name}});
  });
});
