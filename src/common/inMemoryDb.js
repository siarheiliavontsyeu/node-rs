const User = require('../resources/users/user.model');

const DB = [];
const usersCount = 2;

const createUserDB = () => {
  DB.push(new User({ id: '1', login: 'test', name: 'test', password: 'test' }));

  for (let i = 0; i < usersCount; i++) {
    DB.push(new User());
  }
};

createUserDB();

const getAllUsers = async () => {
  return JSON.parse(JSON.stringify(DB));
};

const getUser = async id => {
  const user = DB.find(_user => {
    return _user.id === id;
  });
  return user;
};

const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};

const updateUser = async ({ id, login, password, name } = {}) => {
  let user = await getUser(id);
  user = { ...user, login, password, name };
  const userIndex = DB.findIndex(_user => {
    return _user.id === id;
  });
  if (userIndex >= 0) {
    DB.splice(userIndex, 1, user);
    return getUser(id);
  }
  return false;
};

const removeUser = async id => {
  const user = await getUser(id);
  const userIndex = DB.findIndex(_user => {
    return _user.id === id;
  });

  if (userIndex >= 0) {
    DB.splice(userIndex, 1);
    return user;
  }
  return false;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
