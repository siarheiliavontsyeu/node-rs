const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./task.model');
const tasksService = require('./task.service');
// const validator = require('../../utils/validator');
// const { taskCreate, taskUpdate } = require('../../schemas/taskSchema');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(OK).json(tasks.map(toResponse));
  })
  .post(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create({ ...req.body, boardId });
    res.status(OK).json(toResponse(task));
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.get(taskId);
    res.status(OK).json(toResponse(task));
  })
  .put(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update({
      taskId,
      boardId,
      ...req.body
    });
    res.status(OK).json(toResponse(task));
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;
    await tasksService.remove(taskId);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
