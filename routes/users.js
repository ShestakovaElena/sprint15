const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

module.exports = usersRouter;
