const userCreate = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['name', 'login', 'password'],
  additionalProperties: false
};

const userUpdate = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'login', 'password'],
  additionalProperties: false
};

module.exports = {
  userCreate,
  userUpdate
};
