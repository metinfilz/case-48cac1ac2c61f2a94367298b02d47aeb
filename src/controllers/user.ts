import Joi from 'joi';
import { userService } from '../db/services';

type CreatePayload = {
  name: string;
};
type FindOnePayload = {
  id: string;
};

export const create = async (payload: CreatePayload) => {
  const { name } = createValidateAndTransform(payload);
  await userService.createWithName(name);
};
export const findAll = async () => {
  const users = await userService.findAll();
  return users.map((user) => findAllMapper(user));
};
export const findOne = async (payload: FindOnePayload) => {
  const { id } = findOneValidateAndTransform(payload);
  const { user, borrows } = await userService.fetchBorrowHistory(id);
  return findOneMapper(user, borrows);
};

const createValidateAndTransform = (payload: CreatePayload) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(64).required(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};
const findOneValidateAndTransform = (payload: { id: string }) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive(),
  });
  const { error, value } = schema.validate(payload);
  if (error) throw error;
  return value;
};

const findOneMapper = (
  user: {
    id: number;
    name: string;
  },
  barrow: {
    name: string;
    score: number;
    has_returned: boolean;
  }[]
) => ({
  id: user.id,
  name: user.name,
  books: {
    past: barrow.filter((b) => b.has_returned).map((b) => ({ name: b.name, userScore: b.score })),
    present: barrow.filter((b) => !b.has_returned).map((b) => ({ name: b.name })),
  },
});
const findAllMapper = (user: { id: number; name: string }) => ({ id: user.id, name: user.name });
