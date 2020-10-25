const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const update = obj => usersRepo.update(obj);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
