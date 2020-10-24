const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String
    },
    login: {
      type: String
    },
    password: {
      type: String
    }
  },
  { collection: 'users', versionKey: false }
);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = {
  User: mongoose.model('users', User),
  toResponse
};
