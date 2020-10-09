const User = require('../resources/users/user.model');

const userDB = [];
const usersCount = 2;

const createDB = () => {
  userDB.push(
    new User({ id: '1', login: 'test', name: 'test', password: 'test' })
  );

  for (let i = 0; i < usersCount; i++) {
    userDB.push(new User());
  }
};

createDB();

const getAllUsers = async () => {
  return JSON.parse(JSON.stringify(userDB));
};

const getUser = async id => {
  const user = userDB.find(_user => {
    return _user.id === id;
  });
  return user;
};

const createUser = async user => {
  userDB.push(user);
  return getUser(user.id);
};

const updateUser = async ({ id, login, password, name } = {}) => {
  let user = await getUser(id);
  user = { ...user, login, password, name };
  const userIndex = userDB.findIndex(_user => {
    return _user.id === id;
  });
  if (userIndex >= 0) {
    userDB.splice(userIndex, 1, user);
    return getUser(id);
  }
  return false;
};

const removeUser = async id => {
  const user = await getUser(id);
  const userIndex = userDB.findIndex(_user => {
    return _user.id === id;
  });

  if (userIndex >= 0) {
    userDB.splice(userIndex, 1);
    return user;
  }
  return false;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
