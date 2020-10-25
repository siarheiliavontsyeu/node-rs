const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = obj => boardsRepo.update(obj);
const remove = async id => {
  const allTasks = await tasksRepo.getAllbyBoard(id);
  const tasksForRemove = [];
  for (const task of allTasks) {
    tasksForRemove.push(tasksRepo.remove(task.boardId, task.id));
  }
  await Promise.all(tasksForRemove);
  await boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
