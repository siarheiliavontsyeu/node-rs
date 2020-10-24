const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = taskId => tasksRepo.get(taskId);
const create = task => tasksRepo.create(task);
const update = obj => tasksRepo.update(obj);
const remove = taskId => tasksRepo.remove(taskId);

module.exports = { getAll, get, create, update, remove };
