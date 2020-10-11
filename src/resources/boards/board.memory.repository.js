const DB = require('../../common/inMemoryBoardsDb');
const TasksDB = require('../../common/inMemoryTasksDb');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

const create = async board => DB.createBoard(board);

const update = async ({ id, title, columns } = {}) => {
  const board = await DB.updateBoard({ id, title, columns });
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

const remove = async id => {
  const board = await DB.removeBoard(id);
  await TasksDB.removeTasksFromBoard(board.id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, get, create, update, remove };
