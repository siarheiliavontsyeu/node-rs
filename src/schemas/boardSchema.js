const boardCreate = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    columns: {
      type: 'array'
    }
  },
  required: ['title', 'columns'],
  additionalProperties: false
};

const boardUpdate = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    columns: {
      type: 'array'
    }
  },
  required: ['id', 'title', 'columns'],
  additionalProperties: false
};

module.exports = {
  boardCreate,
  boardUpdate
};
