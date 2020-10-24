const { Task } = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async taskId => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId });
  }
  return task;
};

const create = async task => Task.create(task);

// Посмотреть!
const update = async data => {
  const { id } = data;
  const task = await Task.updateOne({ _id: id }, data);
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return task;
};

const remove = async taskId => {
  const task = await Task.deleteOne({ _id: taskId });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId });
  }
  return task;
};

module.exports = { getAll, get, create, update, remove };
