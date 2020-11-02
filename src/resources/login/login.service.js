const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../../utils/hash-helpers');
const { INCORRECT_LOGIN_OR_PASSWORD } = require('../../errors/appErrors');
const usersRepo = require('../users/user.db.repository');
const ENTITY_NAME = 'login';

const { JWT_SECRET_KEY } = require('../../common/config');

const connect = async user => {
  const gettedUser = await usersRepo.getOneByLogin(user);
  const { login: account } = user;
  if (!gettedUser) {
    throw new INCORRECT_LOGIN_OR_PASSWORD(ENTITY_NAME, { login: account });
  }
  const isPasswordValide = await comparePasswords(
    user.password,
    gettedUser.password
  );
  if (!isPasswordValide) {
    throw new INCORRECT_LOGIN_OR_PASSWORD(ENTITY_NAME, { login: account });
  }
  const { id, login } = gettedUser;

  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = { connect };
