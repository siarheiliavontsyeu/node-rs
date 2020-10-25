const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

class DB {
  constructor() {
    this.usersDB = [];
    this.boardsDB = [];
    this.tasksDB = [];
    // this.createUsersDB();
    // this.createBoardsDB();
    // this.createTasksDB();
  }

  createUsersDB() {
    const usersCount = 3;
    for (let i = 0; i < usersCount; i++) {
      this.usersDB.push(new User());
    }
  }

  createBoardsDB() {
    const boardsCount = 3;
    for (let i = 0; i < boardsCount; i++) {
      this.boardsDB.push(new Board());
    }
  }

  createTasksDB() {
    const tasksCount = 3;
    for (let i = 0; i < tasksCount; i++) {
      this.tasksDB.push(new Task());
    }
  }

  async getAllUsers() {
    return JSON.parse(JSON.stringify(this.usersDB));
  }

  async getUser(id) {
    const user = this.usersDB.find(_user => {
      return _user.id === id;
    });
    return user;
  }

  async createUser(user) {
    this.usersDB.push(user);
    return this.getUser(user.id);
  }

  async updateUser({ id, login, password, name } = {}) {
    let user = await this.getUser(id);
    user = { ...user, login, password, name };
    const userIndex = this.usersDB.findIndex(_user => {
      return _user.id === id;
    });
    if (userIndex >= 0) {
      this.usersDB.splice(userIndex, 1, user);
      return this.getUser(id);
    }
    return false;
  }

  async removeUser(id) {
    const user = await this.getUser(id);
    const userIndex = this.usersDB.findIndex(_user => {
      return _user.id === id;
    });

    if (userIndex >= 0) {
      this.usersDB.splice(userIndex, 1);
      return user;
    }
    return false;
  }

  async getAllBoards() {
    return JSON.parse(JSON.stringify(this.boardsDB));
  }

  getBoard(id) {
    const board = this.boardsDB.find(_board => {
      return _board.id === id;
    });
    return board;
  }

  async createBoard(board) {
    this.boardsDB.push(board);
    return this.getBoard(board.id);
  }

  async updateBoard({ id, title, columns } = {}) {
    let board = await this.getBoard(id);
    board = { ...board, title, columns };
    const boardIndex = this.boardsDB.findIndex(_board => {
      return _board.id === id;
    });
    if (boardIndex >= 0) {
      this.boardsDB.splice(boardIndex, 1, board);
      return this.getBoard(id);
    }
    return false;
  }

  async removeBoard(id) {
    const board = await this.getBoard(id);
    const boardIndex = this.boardsDB.findIndex(_board => {
      return _board.id === id;
    });

    if (boardIndex >= 0) {
      this.boardsDB.splice(boardIndex, 1);
      return board;
    }
    return false;
  }

  async getAllTasks(boardId) {
    const tasks = this.tasksDB.filter(board => {
      return board.boardId === boardId;
    });
    return JSON.parse(JSON.stringify(tasks));
  }

  async getTask(boardId, taskId) {
    const task = this.tasksDB.find(_task => {
      return _task.id === taskId;
    });

    return task;
  }

  async createTask(task) {
    this.tasksDB.push(task);
    return this.getTask(task.boardId, task.id);
  }

  async updateTask({
    title,
    order,
    description,
    taskId,
    userId,
    boardId,
    columnId
  } = {}) {
    let task = await this.getTask(boardId, taskId);
    task = { ...task, title, order, description, userId, boardId, columnId };
    const taskIndex = this.tasksDB.findIndex(_task => {
      return _task.id === taskId;
    });
    if (taskIndex >= 0) {
      this.tasksDB.splice(taskIndex, 1, task);
      return this.getTask(boardId, taskId);
    }
    return false;
  }

  async removeTask(boardId, taskId) {
    const task = await this.getTask(boardId, taskId);
    const taskIndex = this.tasksDB.findIndex(_task => {
      return _task.id === taskId;
    });

    if (taskIndex >= 0) {
      this.tasksDB.splice(taskIndex, 1);
      return task;
    }
    return false;
  }

  async unassignUsersFromTask(userId) {
    this.tasksDB.forEach(task => {
      if (task.userId === userId) {
        task.userId = null;
      }
    });
  }

  async removeTasksFromBoard(boardId) {
    this.tasksDB = this.tasksDB.filter(board => {
      return board.boardId !== boardId;
    });
  }
}

module.exports = new DB();
