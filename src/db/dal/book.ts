import Book, { BookAttributes, BookCreationAttributes } from '../models/book';

export const create = async (payload: BookCreationAttributes): Promise<BookAttributes> => {
  return await Book.create(payload);
};
export const findWithId = async (id: number, attributes: Array<keyof BookAttributes> | undefined = undefined) => {
  return await Book.findByPk(id, { attributes });
};
export const findAll = async (): Promise<BookAttributes[]> => {
  return await Book.findAll();
};
