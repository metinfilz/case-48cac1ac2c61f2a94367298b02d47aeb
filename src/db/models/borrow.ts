import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';
import Book from './book';
import User from './user';

export type BorrowAttributes = {
  id: number;
  book_id: number;
  user_id: number;
  score: number;
  has_returned: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BorrowCreationAttributes = Optional<BorrowAttributes, 'id' | 'score' | 'has_returned' | 'createdAt' | 'updatedAt'>;

class Borrow extends Model<InferAttributes<Borrow>, InferCreationAttributes<Borrow>> implements BorrowAttributes {
  declare id: CreationOptional<number>;
  declare book_id: number;
  declare user_id: number;
  declare score: CreationOptional<number>;
  declare has_returned: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const init = () =>
  Borrow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Book,
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      has_returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { freezeTableName: true, sequelize, tableName: 'Borrows' }
  );
export default Borrow;
