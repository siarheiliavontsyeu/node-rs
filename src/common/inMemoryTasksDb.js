const Task = require('../resources/tasks/task.model');

const tasksDB = [];
const tasksCount = 2;

const createDB = () => {
  tasksDB.push({
    id: '1',
    title: 'Task',
    order: 0,
    description: 'test',
    userId: 'test',
    boardId: 'test1',
    columnId: 'test'
  });

  for (let i = 0; i < tasksCount; i++) {
    tasksDB.push(new Task());
  }
};

createDB();

const getAllTasks = async boardId => {
  const tasks = tasksDB.filter(board => {
    return board.boardId === boardId;
  });
  return JSON.parse(JSON.stringify(tasks));
};

const getTask = async id => {
  const task = tasksDB.find(_task => {
    return _task.id === id;
  });
  return task;
};

const createTask = async task => {
  tasksDB.push(task);
  return getTask(task.id);
};

const updateTask = async ({ id, login, password, name } = {}) => {
  let task = await getTask(id);
  task = { ...task, login, password, name };
  const taskIndex = tasksDB.findIndex(_task => {
    return _task.id === id;
  });
  if (taskIndex >= 0) {
    tasksDB.splice(taskIndex, 1, task);
    return getTask(id);
  }
  return false;
};

const removeTask = async id => {
  const task = await getTask(id);
  const taskIndex = tasksDB.findIndex(_task => {
    return _task.id === id;
  });

  if (taskIndex >= 0) {
    tasksDB.splice(taskIndex, 1);
    return task;
  }
  return false;
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask
};
