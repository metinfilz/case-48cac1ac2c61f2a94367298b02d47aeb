import { BookNotFoundError } from '../../errors';
import { bookDAL } from '../dal';

export const checkWithId = async (id: number) => {
  const book = await bookDAL.findWithId(id, ['id']);
  if (!book) throw new BookNotFoundError();
};
export const createWithName = async (name: string) => {
  await bookDAL.create({ name });
};
export const findWithId = async (id: number) => {
  const book = await bookDAL.findWithId(Number(id));
  if (!book) throw new BookNotFoundError();
  return book;
};
export const findAll = async () => {
  return await bookDAL.findAll();
};
export const updateScore = async (id: number, score: number) => {
  const book = await bookDAL.findWithId(id, ['id', 'score', 'score_count']);
  if (!book) throw new BookNotFoundError();
  const totalScore = (book.score ? Number(book.score) : 0) * book.score_count + score;
  book.set({
    score: (totalScore / (book.score_count + 1)).toFixed(1),
    score_count: book.score_count + 1,
  });
  await book.save();
};
