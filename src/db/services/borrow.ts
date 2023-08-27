import { BookAlreadyBorrowed, BorrowNotFoundError } from '../../errors';
// import { borrowDAL } from '../dal';

import Borrow from '../models/borrow';

export const borrowBook = async (book_id: number, user_id: number) => {
  const [borrow, created] = await Borrow.findOrBuild({
    where: { book_id, has_returned: false },
  });
  if (!created) throw new BookAlreadyBorrowed();
  borrow.set({ user_id: user_id });
  await borrow.save();
};

export const returnBook = async (book_id: number, user_id: number, score: number) => {
  const borrow = await Borrow.findOne({ where: { book_id, user_id, has_returned: false } });
  if (!borrow) throw new BorrowNotFoundError();
  borrow.set({ has_returned: true, score });
  await borrow.save();
};
