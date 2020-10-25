const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = obj => tasksRepo.update(obj);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
