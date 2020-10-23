const DB = require('../../common/inMemoryDb');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'task';

const getAll = async boardId => {
  const tasks = await DB.getAllTasks(boardId);
  if (!tasks) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { boardId });
  }
  return tasks;
};

const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { boardId, taskId });
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async ({
  title,
  order,
  description,
  taskId,
  userId,
  boardId,
  columnId
} = {}) => {
  const task = await DB.updateTask({
    title,
    order,
    description,
    taskId,
    userId,
    boardId,
    columnId
  });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId });
  }
  return task;
};

const remove = async (boardId, taskId) => {
  const task = await DB.removeTask(boardId, taskId);
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId });
  }
  return task;
};

module.exports = { getAll, get, create, update, remove };
