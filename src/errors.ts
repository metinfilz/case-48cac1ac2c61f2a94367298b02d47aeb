import { NextFunction, Request, Response } from 'express';
import { ValidationError as JoiValidationError } from 'joi';
export const logger = (err: Error, _: Request, res: Response, next: NextFunction) => {
  console.log(err.name, err.message);
  next(err);
};
export const handler = (err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof JoiValidationError) return res.status(400).json({ error: { message: err.message } });
  else if (err instanceof BookNotFoundError)
    return res.status(err.status_code).json({ error: { message: err.message, code: err.error_code } });
  else if (err instanceof BorrowNotFoundError)
    return res.status(err.status_code).json({ error: { message: err.message, code: err.error_code } });
  else if (err instanceof UserNotFoundError)
    return res.status(err.status_code).json({ error: { message: err.message, code: err.error_code } });
  else if (err instanceof BookAlreadyBorrowed) {
    return res.status(err.status_code).json({ error: { message: err.message, code: err.error_code } });
  }
  res.status(500).json({ error: { message: err.message } });
};

export class UserNotFoundError extends Error {
  public readonly error_code: number = -1;
  public readonly name = 'UserNotFoundError';
  public readonly status_code: number = 404;

  constructor() {
    super('User not found in the database.');
  }
}

export class BookNotFoundError extends Error {
  public readonly error_code: number = -1;
  public readonly name = 'BookNotFoundError';
  public readonly status_code: number = 404;

  constructor() {
    super('Book not found in the database.');
  }
}

export class BorrowNotFoundError extends Error {
  public readonly error_code: number = -1;
  public readonly name = 'BorrowNotFoundError';
  public readonly status_code: number = 404;

  constructor() {
    super('Borrow not found in the database.');
  }
}

export class BookAlreadyBorrowed extends Error {
  public readonly error_code: number = -1;
  public readonly name = 'BookAlreadyBorrowed';
  public readonly status_code: number = 404;

  constructor() {
    super('Book already borrowed.');
  }
}
