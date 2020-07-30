const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-err');

const loginCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
});

const createUserCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Введите корректную ссылку');
      } else { return value; }
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
});

const getUserCheck = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

const createCardCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Введите корректную ссылку');
      } else { return value; }
    }),
  }),
});

const getCardCheck = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  loginCheck, createUserCheck, getUserCheck, createCardCheck, getCardCheck,
};
