const { Board } = require('./board.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const create = async board => Board.create(board);

const update = async board => {
  const { id } = board;
  await Board.updateOne({ _id: id }, board);
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const remove = async id => {
  const board = Board.deleteOne({ _id: id });
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

module.exports = { getAll, get, create, update, remove };
