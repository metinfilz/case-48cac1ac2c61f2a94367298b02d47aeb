import request from 'supertest';
import app from '../../src/app';

describe('Route User Payload Validation', () => {
  it('name length > 2  [POST: /users - body: {name}]', async () => {
    const res = await request(app).post('/users').send({name: 'AB'})
    expect(res.statusCode).toBe(400)
  })
  it('name length < 65 [POST: /users - body: {name}]', async () => {
    const res = await request(app).post('/users').send({name: Array(65).fill('A').join('')})
    expect(res.statusCode).toBe(400)
  })
  it('typeof name !== object  [POST: /users - body: {name}]', async () => {
    const res = await request(app).post('/users').send({name: {}})
    expect(res.statusCode).toBe(400)
  })
  it('typeof name !== array  [POST: /users - body: {name}]', async () => {
    const res = await request(app).post('/users').send({name: []})
    expect(res.statusCode).toBe(400)
  })
  it('typeof user_id !== string [GET: /users/:user_id]', async () => {
    const res = await request(app).get('/users/sd2')
    expect(res.statusCode).toBe(400)
  })
  it('typeof user_id !== float [GET: /users/:user_id]', async () => {
    const res = await request(app).get('/users/1.3')
    expect(res.statusCode).toBe(400)
  })
  it('user_id > 0 [GET: /users/:user_id]', async () => {
    const res = await request(app).get('/users/-1')
    expect(res.statusCode).toBe(400)
  })
})
