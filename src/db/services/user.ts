import { UserNotFoundError } from '../../errors';
import { userDAL } from '../dal';

export const checkUserById = async (id: number) => {
  const user = await userDAL.findWithId(id, ['id']);
  if (!user) throw new UserNotFoundError();
};
export const createWithName = async (name: string) => {
  await userDAL.create({ name });
};
export const findAll = async () => {
  return await userDAL.findAll();
};
export const fetchBorrowHistory = async (id: number) => {
  const user = await userDAL.findWithId(id);
  if (!user) throw new UserNotFoundError();
  const borrows = await userDAL.fetchBorrowHistory(user.id);
  return { user, borrows };
};
