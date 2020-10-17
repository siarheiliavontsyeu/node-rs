const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await tasksService.get(boardId, taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const { title, order, description, userId, columnId } = req.body;
  const { boardId } = req.params;
  const task = await tasksService.create(
    new Task({ title, order, description, userId, boardId, columnId })
  );
  res.json(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.update({
      title,
      order,
      description,
      taskId,
      userId,
      boardId,
      columnId
    });
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    await tasksService.remove(boardId, taskId);
    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
