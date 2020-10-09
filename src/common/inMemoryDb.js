const User = require('../resources/users/user.model');

const DB = [];
const usersCount = 2;

for (let i = 0; i < usersCount; i++) {
  DB.push(new User());
}

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
module.exports = { getAllUsers, getUser, createUser };
