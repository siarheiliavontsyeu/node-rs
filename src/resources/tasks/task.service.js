const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = (boardId, taskId, obj) => tasksRepo.update(boardId, taskId, obj);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
