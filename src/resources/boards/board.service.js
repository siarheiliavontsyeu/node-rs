const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = ({ id, title, columns } = {}) =>
  boardsRepo.update({ id, title, columns });
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
