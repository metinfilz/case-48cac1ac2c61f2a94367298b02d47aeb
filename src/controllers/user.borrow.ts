import Joi from 'joi';
import { bookService, borrowService, userService } from '../db/services';

type BorrowBookPayload = {
  book_id: string;
  user_id: string;
};

export const borrowBook = async (payload: BorrowBookPayload) => {
  const { book_id, user_id } = borrowBookValidateAndTransformPayload(payload);
  await userService.checkUserById(user_id);
  await bookService.checkWithId(book_id);
  await borrowService.borrowBook(book_id, user_id);
};

const borrowBookValidateAndTransformPayload = (payload: BorrowBookPayload) => {
  const schema = Joi.object({
    book_id: Joi.number().integer().positive().required(),
    user_id: Joi.number().integer().positive().required(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};
