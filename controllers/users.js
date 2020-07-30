const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    throw new BadRequestError('Неверный формат id пользователя');
  }
  return User.findById(req.params.userId)
    .orFail(
      () => new NotFoundError(`Пользователь с _id ${req.params.userId} не найден`),
    )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: 'Ошибка валидации' }) : res.status(409).send({ message: 'Пользователь с такими данными уже существует' })));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
