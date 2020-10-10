const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await tasksService.get(boardId, taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { title, order, description, userId, columnId } = req.body;
  const { boardId } = req.params;
  const task = await tasksService.create(
    new Task({ title, order, description, userId, boardId, columnId })
  );
  res.json(Task.toResponse(task));
});

// router.route('/:id').put(async (req, res) => {
//   try {
//     const { title, columns } = req.body;
//     const { id } = req.params;
//     const task = await tasksService.update({ id, title, columns });
//     res.json(Task.toResponse(task));
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

// router.route('/:id').delete(async (req, res) => {
//   try {
//     await tasksService.remove(req.params.id);
//     res.sendStatus(204);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

module.exports = router;
