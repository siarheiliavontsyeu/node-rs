const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');
const { hashPassword } = require('../../utils/hash-helpers');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = async user => {
  const hash = await hashPassword(user.password);
  return usersRepo.create({ ...user, password: hash });
};
const update = async obj => {
  const hash = await hashPassword(obj.password);
  return usersRepo.update({ ...obj, password: hash });
};
const remove = async id => {
  const allTasks = await tasksRepo.getAll();
  const tasks = allTasks.filter(task => task.userId === id);
  const taskForUpdate = [];
  for (const task of tasks) {
    taskForUpdate.push(
      tasksRepo.update(task.boardId, task.id, {
        ...task._doc,
        userId: null
      })
    );
  }
  await Promise.all(taskForUpdate);
  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
