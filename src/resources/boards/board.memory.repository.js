const DB = require('../../common/inMemoryDb');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'board';

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const create = async board => DB.createBoard(board);

const update = async ({ id, title, columns } = {}) => {
  const board = await DB.updateBoard({ id, title, columns });
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const remove = async id => {
  const board = await DB.removeBoard(id);
  await DB.removeTasksFromBoard(board.id);
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

module.exports = { getAll, get, create, update, remove };
