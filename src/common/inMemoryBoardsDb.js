const Board = require('../resources/boards/board.model');

const boardsDB = [];
const boardsCount = 2;

const createDB = () => {
  boardsDB.push({
    id: 'test',
    title: ' test',
    colums: [{ id: '1', title: 'test', order: '1' }]
  });

  for (let i = 0; i < boardsCount; i++) {
    boardsDB.push(new Board());
  }
};

createDB();

const getAllBoards = async () => {
  return JSON.parse(JSON.stringify(boardsDB));
};

const getBoard = async id => {
  const board = boardsDB.find(_board => {
    return _board.id === id;
  });
  return board;
};

const createBoard = async board => {
  boardsDB.push(board);
  return getBoard(board.id);
};

const updateBoard = async ({ id, title, columns } = {}) => {
  let board = await getBoard(id);
  board = { ...board, title, columns };
  const boardIndex = boardsDB.findIndex(_board => {
    return _board.id === id;
  });
  if (boardIndex >= 0) {
    boardsDB.splice(boardIndex, 1, board);
    return getBoard(id);
  }
  return false;
};

const removeBoard = async id => {
  const board = await getBoard(id);
  const boardIndex = boardsDB.findIndex(_board => {
    return _board.id === id;
  });

  if (boardIndex >= 0) {
    boardsDB.splice(boardIndex, 1);
    return board;
  }
  return false;
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
