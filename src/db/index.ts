import { Sequelize } from 'sequelize';
import Book, { init as bookInit } from './models/book';
import Borrow, { init as borrowInit } from './models/borrow';
import User, { init as userInit } from './models/user';

const dbString = process.env.NODE_ENV === 'test' ? process.env['TEST_DB_STRING'] : process.env['DB_STRING'] ?? process.env['DEV_DB_STRING'];

export const sequelize = new Sequelize(`${dbString}`, {
  logging: false,
});
export const init = async () => {
  await sequelize.sync();
  bookInit();
  userInit();
  borrowInit();
  await Promise.all([Book.sync(), User.sync(), Borrow.sync()]);
};
