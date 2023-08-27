import Joi from 'joi';
import { bookService } from '../db/services/index';

type CreatePayload = {
  name: string;
};
type FindOnePayload = {
  id: string;
};

export const create = async (payload: CreatePayload) => {
  const { name } = createValidateAndTransform(payload);
  await bookService.createWithName(name);
};
export const findAll = async () => {
  const books = await bookService.findAll();
  return books.map((book) => findAllMapper(book));
};
export const findOne = async (payload: FindOnePayload) => {
  const { id } = findOneValidateAndTransform(payload);
  const book = await bookService.findWithId(id);
  return findOneMapper(book);
};

const createValidateAndTransform = (payload: CreatePayload) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(64).required(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};
const findOneValidateAndTransform = (payload: FindOnePayload) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};

const findOneMapper = (book: { id: number; name: string; score: string }) => ({
  id: book.id,
  name: book.name,
  score: book.score ?? -1,
});
const findAllMapper = (book: { id: number; name: string }) => ({ id: book.id, name: book.name });
