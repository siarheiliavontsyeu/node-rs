const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.create(new Board({ title, columns }));
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const { id } = req.params;
    const board = await boardsService.update({ id, title, columns });
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
