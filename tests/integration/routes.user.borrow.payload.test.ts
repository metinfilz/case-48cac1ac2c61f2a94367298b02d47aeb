import request from 'supertest';
import app from '../../src/app';

describe('Route User Borrow Payload Validation', () => {
  it('typeof book_id !== string [GET: /users/1/borrow/:book_id]', async () => {
    const res = await request(app).post('/users/1/borrow/sd2')
    expect(res.statusCode).toBe(400)
  })
  it('typeof book_id !== float [GET: /users/1/borrow/:book_id]', async () => {
    const res = await request(app).post('/users/1/borrow/1.3')
    expect(res.statusCode).toBe(400)
  })
  it('book_id > 0 [GET: /users/1/borrow/:book_id]', async () => {
    const res = await request(app).post('/users/1/borrow/-1')
    expect(res.statusCode).toBe(400)
  })
})
