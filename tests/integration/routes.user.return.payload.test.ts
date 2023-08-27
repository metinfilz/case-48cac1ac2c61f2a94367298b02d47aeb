import request from 'supertest';
import app from '../../src/app';

describe('Route User Return Payload Validation', () => {
  it('typeof book_id !== string [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/sd2').send({ score: 1 });
    expect(res.statusCode).toBe(400);
  });
  it('typeof book_id !== float [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/1.3').send({ score: 1 });
    expect(res.statusCode).toBe(400);
  });
  it('book_id > 0 [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/-1').send({ score: 1 });
    expect(res.statusCode).toBe(400);
  });
  it('typeof score !== string [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/-1').send({ score: 'dfdf' });
    expect(res.statusCode).toBe(400);
  });
  it('typeof score !== float [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/-1').send({ score: 4.5 });
    expect(res.statusCode).toBe(400);
  });
  it('score > -1 [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/-1').send({ score: -1 });
    expect(res.statusCode).toBe(400);
  });
  it('score < 11 [POST: /users/1/return/:book_id - body:{score}]', async () => {
    const res = await request(app).post('/users/1/return/-1').send({ score: 11 });
    expect(res.statusCode).toBe(400);
  });
});
