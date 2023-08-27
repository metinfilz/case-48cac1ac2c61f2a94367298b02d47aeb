import Joi from 'joi';
import { bookService, borrowService, userService } from '../db/services';

type ReturnBookPayload = {
  book_id: string;
  user_id: string;
  score: string;
};

export const returnBook = async (payload: ReturnBookPayload) => {
  const { book_id, score, user_id } = returnBookValidateAndTransformPayload(payload);
  await userService.checkUserById(user_id);
  await bookService.checkWithId(book_id);
  await borrowService.returnBook(book_id, user_id, score);
  await bookService.updateScore(book_id, score).catch();
};

const returnBookValidateAndTransformPayload = (payload: ReturnBookPayload) => {
  const schema = Joi.object({
    book_id: Joi.number().integer().positive().required(),
    score: Joi.number().integer().greater(-1).less(11).required(),
    user_id: Joi.number().integer().positive().required(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};
