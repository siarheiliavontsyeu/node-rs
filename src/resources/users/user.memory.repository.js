const DB = require('../../common/inMemoryDb');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const create = async user => DB.createUser(user);

const update = async ({ id, login, password, name } = {}) => {
  const user = await DB.updateUser({ id, login, password, name });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return user;
};

const remove = async id => {
  const user = await DB.removeUser(id);
  await DB.unassignUsersFromTask(user.id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

module.exports = { getAll, get, create, update, remove };
