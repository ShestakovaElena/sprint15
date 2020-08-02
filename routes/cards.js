const cardsRouter = require('express').Router();
const { createCardCheck, getCardCheck } = require('../middlewares/validator');

const { getCards, createCard, deleteCardById } = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCardCheck, createCard);

cardsRouter.delete('/:cardId', getCardCheck, deleteCardById);

module.exports = cardsRouter;
