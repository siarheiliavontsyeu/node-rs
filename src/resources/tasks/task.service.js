const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = ({
  title,
  order,
  description,
  taskId,
  userId,
  boardId,
  columnId
} = {}) =>
  tasksRepo.update({
    title,
    order,
    description,
    taskId,
    userId,
    boardId,
    columnId
  });
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
