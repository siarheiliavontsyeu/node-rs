const tasksRepo = require('./task.db.repository');

const getAll = () => tasksRepo.getAll();
const get = taskId => tasksRepo.get(taskId);
const create = task => tasksRepo.create(task);
const update = (id, obj) => tasksRepo.update(id, obj);
const remove = taskId => tasksRepo.remove(taskId);

module.exports = { getAll, get, create, update, remove };
