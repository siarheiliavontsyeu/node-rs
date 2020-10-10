const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = boardId => tasksRepo.get(boardId);
const create = task => tasksRepo.create(task);
const update = ({ id, title, columns } = {}) =>
  tasksRepo.update({ id, title, columns });
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
