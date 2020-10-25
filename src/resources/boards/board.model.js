const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = new Schema({
  title: {
    type: String
  },
  order: {
    type: Number
  }
});

const Board = new Schema(
  {
    title: {
      type: String,
      default: 'Title'
    },
    columns: [Column]
  },
  { collection: 'boards', versionKey: false }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};
