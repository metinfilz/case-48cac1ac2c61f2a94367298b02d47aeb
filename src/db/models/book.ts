import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

export type BookAttributes = {
  id: number;
  name: string;
  score: string;
  score_count: number;
  createdAt: Date;
  updatedAt: Date;
};
export type BookCreationAttributes = Optional<BookAttributes, 'id' | 'score' | 'score_count' | 'createdAt' | 'updatedAt'>;

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> implements BookAttributes {
  declare id: CreationOptional<number>;
  declare name: string;
  declare score: CreationOptional<string>;
  declare score_count: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const init = () =>
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      score_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { freezeTableName: true, sequelize, tableName: 'Books' }
  );

export default Book;
