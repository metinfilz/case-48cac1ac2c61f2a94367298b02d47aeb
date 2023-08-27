import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

export type UserAttributes = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreationalAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const init = () =>
  User.init(
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { freezeTableName: true, sequelize, tableName: 'Users' }
  );

export default User;
