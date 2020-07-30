const usersRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');
const { getUserCheck } = require('../middlewares/validator');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserCheck, getUserById);

module.exports = usersRouter;
