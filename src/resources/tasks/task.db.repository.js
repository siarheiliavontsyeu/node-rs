const { Task } = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'task';

const getAllbyBoard = async boardId => Task.find({ boardId });

const getAll = async () => Task.find({});

const getById = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId });
  }
  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, taskId, data) => {
  const task = await Task.updateOne({ _id: taskId, boardId }, data);
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId, boardId, data });
  }
  return task;
};

const remove = async (boardId, taskId) => {
  const task = await Task.deleteOne({ _id: taskId, boardId });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId, boardId });
  }
  return task;
};

module.exports = { getAllbyBoard, getAll, getById, create, update, remove };
