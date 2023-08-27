import dotenv from 'dotenv';
import { sequelize, init } from '../../src/db';
import { Book, Borrow, User } from '../../src/db/models';
import request from 'supertest';
import app from '../../src/app';

describe('Database Actions', () => {
  beforeEach(async () => {
    await init()
    await Borrow.drop()
    await Book.drop()
    await User.drop()
    await init()
  })
  it('return book and give 5 score', async () => {
    await request(app).post('/users').send({ name: 'user1' });
    await request(app).post('/users').send( {name: 'user2'})
    await request(app).post('/books').send({ name: 'book1' });
    await request(app).post('/books').send({ name: 'book2' });
    await request(app).post('/users/1/borrow/1');
    await request(app).post('/users/1/return/1').send({ score: 5 });
    await request(app).post('/users/2/borrow/1');
    await request(app).post('/users/2/return/1').send({ score: 7 });
    await request(app).post('/users/1/borrow/1');

    const { body: book } = await request(app).get('/books/1');
    const { body: user } = await request(app).get('/users/1');
    const [firstBorrow] = user.books.past
    expect(book.score).toBe("6.0")
    expect(firstBorrow.userScore).toBe(5)
  })
})
