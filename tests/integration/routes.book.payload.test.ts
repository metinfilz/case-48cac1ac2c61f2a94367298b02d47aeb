import request from 'supertest';
import app from '../../src/app';


describe('Route Book Payload Validation', () => {
  it('name length > 2  [POST: /books - body: {name}]', async () => {
    const res = await request(app).post('/books').send({name: 'AB'})
    expect(res.statusCode).toBe(400)
  })
  it('name length < 65 [POST: /books - body: {name}]', async () => {
    const res = await request(app).post('/books').send({name: Array(65).fill('A').join('')})
    expect(res.statusCode).toBe(400)
  })
  it('typeof name !== object  [POST: /books - body: {name}]', async () => {
    const res = await request(app).post('/books').send({name: {}})
    expect(res.statusCode).toBe(400)
  })
  it('typeof name !== array  [POST: /books - body: {name}]', async () => {
    const res = await request(app).post('/books').send({name: []})
    expect(res.statusCode).toBe(400)
  })
  it('typeof book_id !== string [GET: /books/:book_id]', async () => {
    const res = await request(app).get('/books/sd2')
    expect(res.statusCode).toBe(400)
  })
  it('typeof book_id !== float [GET: /books/:book_id]', async () => {
    const res = await request(app).get('/books/1.3')
    expect(res.statusCode).toBe(400)
  })
  it('book_id > 0 [GET: /books/:book_id]', async () => {
    const res = await request(app).get('/books/-1')
    expect(res.statusCode).toBe(400)
  })
})
