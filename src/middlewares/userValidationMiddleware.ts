import Joi from 'joi';


export const userValidationRules = {
  getUserById: Joi.object({
    userId: Joi.number().required().min(1),
  }),
  createUser: Joi.object({
    name: Joi.string().trim().required().min(3),
  }),
  borrowBook: Joi.object({
    userId: Joi.number().required().min(1),
    bookId: Joi.number().required().min(1),
  }),
  returnBookParams: Joi.object({
    userId: Joi.number().required().min(1),
    bookId: Joi.number().required().min(1),   
  }),
  returnBookBody: Joi.object({
    score: Joi.number().required().min(1).max(10),
  })
};