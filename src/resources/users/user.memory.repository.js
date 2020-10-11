const DB = require('../../common/inMemoryUsersDb');
const TasksDB = require('../../common/inMemoryTasksDb');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const create = async user => DB.createUser(user);

const update = async ({ id, login, password, name } = {}) => {
  const user = await DB.updateUser({ id, login, password, name });
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const remove = async id => {
  const user = await DB.removeUser(id);
  await TasksDB.unassignUsersFromTask(user.id);
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }
  return user;
};

module.exports = { getAll, get, create, update, remove };
