const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = obj => boardsRepo.update(obj);
const remove = async id => {
  const allTasks = await tasksRepo.getAllbyBoard(id);
  for (const task of allTasks) {
    await tasksRepo.remove(task.boardId, task.id);
  }
  boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
