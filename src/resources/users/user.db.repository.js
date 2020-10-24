const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const create = async user => User.create(user);

const update = async user => {
  const { id } = user;
  await User.updateOne({ _id: id }, user);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return get(id);
};

const remove = async id => {
  const user = await User.deleteOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  // await DB.unassignUsersFromTask(user.id);
  return user;
};

module.exports = { getAll, get, create, update, remove };
