import User, { UserAttributes, UserCreationalAttributes } from '../models/user';
import { sequelize } from '../index';
import { QueryTypes } from 'sequelize';
import Book from '../models/book';
import Borrow from '../models/borrow';

type BorrowHistory = {
  name: string;
  score: number;
  has_returned: boolean;
};

export const create = async (payload: UserCreationalAttributes) => {
  return await User.create({ ...payload });
};
export const findWithId = async (id: number, attributes: Array<keyof UserAttributes> | undefined = undefined) => {
  return await User.findByPk(id, { attributes });
};
export const findAll = async () => {
  return await User.findAll();
};
export const fetchBorrowHistory = async (user_id: number): Promise<BorrowHistory[]> => {
  const T1 = Book.tableName;
  const T2 = Borrow.tableName;
  const query = `
      SELECT "${T1}".name, "${T2}".score, "${T2}".has_returned
      FROM "${T2}"
               INNER JOIN "${T1}"
                          ON "${T2}".book_id = "${T1}".id AND "${T2}".user_id = ${user_id}`;
  return await sequelize.query(query, { type: QueryTypes.SELECT });
};
