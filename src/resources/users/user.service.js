const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const update = obj => usersRepo.update(obj);
const remove = async id => {
  const allTasks = await tasksRepo.getAll();
  const tasks = allTasks.filter(task => task.userId === id);

  for (const task of tasks) {
    await tasksRepo.update(task.boardId, task.id, {
      ...task._doc,
      userId: null
    });
  }
  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
