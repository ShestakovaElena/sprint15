const { celebrate, Joi } = require('celebrate');

const loginCheck = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
};

const createUserCheck = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
};

const getUserCheck = {
  body: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
};

module.exports = {
  loginCheck, createUserCheck, getUserCheck,
};
