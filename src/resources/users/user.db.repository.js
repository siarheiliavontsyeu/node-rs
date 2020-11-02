const mongoose = require('mongoose');
const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const getOneByLogin = async ({ login }) => {
  const user = (await User.find({ login }))[0];
  return user;
};

const create = async user => User.create(user);

const update = async user => {
  const { id } = user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  await User.updateOne({ _id: id }, user);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return get(id);
};

const remove = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const user = await User.deleteOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

module.exports = { getAll, get, getOneByLogin, create, update, remove };
