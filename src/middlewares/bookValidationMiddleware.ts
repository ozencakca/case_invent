import Joi from 'joi';

export const bookRequestValidationRules = {
  getBook: Joi.object({
    bookId: Joi.number().required(),
  }),
  createBook: Joi.object({
    name: Joi.string().trim().required().min(2).max(200),
  }),
}