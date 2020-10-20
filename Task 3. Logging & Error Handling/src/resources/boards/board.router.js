const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const boards = await boardsService.getAll();
  const board = boards.filter((val) => val.id === req.params.id);
  res.status(board.length ? 200 : 404).json(board.length ? board[0] : '');
});

router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const columns = req.body.columns;
  const createdBoard = boardsService.addBoard(new Board({
    title,
    columns
  }));
  res.json(createdBoard);
});

router.route('/:id').put(async (req, res) => {
  const updatedBoard = boardsService.updateBoard(req.params.id, req.body);
  res.json(updatedBoard);
});

router.route('/:id').delete(async (req, res) => {
  const isBoardDeleted = boardsService.deleteBoard(req.params.id);
  res.sendStatus(isBoardDeleted ? 200 : 204);
});

module.exports = router;
