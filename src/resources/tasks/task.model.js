const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: {
      type: String
    },
    order: {
      type: Number
    },
    description: {
      type: String
    },
    userId: {
      type: String
    },
    boardId: {
      type: String
    },
    columnId: {
      type: String
    }
  },
  { versionKey: false }
);

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};
