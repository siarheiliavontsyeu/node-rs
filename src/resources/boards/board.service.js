const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = obj => boardsRepo.update(obj);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
