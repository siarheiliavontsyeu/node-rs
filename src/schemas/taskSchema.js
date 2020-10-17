const taskCreate = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    order: {
      type: 'number'
    },
    boardId: {
      type: 'string'
    },
    columnId: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  },
  required: ['title', 'order', 'boardId'],
  additionalProperties: true
};
/*
  "title": "string",
  "order": 0,
  "description": "string",
  "userId": "string",
  "boardId": "string",
  "columnId": "string"
*/
const taskUpdate = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    order: {
      type: 'number'
    },
    boardId: {
      type: 'string'
    },
    columnId: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  },
  required: ['title', 'order', 'boardId'],
  additionalProperties: true
};

module.exports = {
  taskCreate,
  taskUpdate
};
