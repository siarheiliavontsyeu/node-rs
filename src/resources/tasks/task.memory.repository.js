const DB = require('../../common/inMemoryTasksDb');

const getAll = async boardId => {
  const tasks = await DB.getAllTasks(boardId);
  if (!tasks) {
    throw new Error(`The task with id: ${boardId} was not found`);
  }
  return tasks;
};

const get = async boardId => {
  const task = await DB.getTask(boardId);
  if (!task) {
    throw new Error(`The task with id: ${boardId} was not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async ({ id, title, columns } = {}) => {
  const task = await DB.updateTask({ id, title, columns });
  if (!task) {
    throw new Error(`The task with id: ${id} was not found`);
  }
  return task;
};

const remove = async id => {
  const task = await DB.removeTask(id);
  if (!task) {
    throw new Error(`The task with id: ${id} was not found`);
  }
  return task;
};

module.exports = { getAll, get, create, update, remove };
