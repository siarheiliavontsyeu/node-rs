const DB = require('../../common/inMemoryTasksDb');

const getAll = async boardId => {
  const tasks = await DB.getAllTasks(boardId);
  if (!tasks) {
    throw new Error(`The task with id: ${boardId} was not found`);
  }
  return tasks;
};

const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
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
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

const remove = async (boardId, taskId) => {
  const task = await DB.removeTask(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

module.exports = { getAll, get, create, update, remove };
