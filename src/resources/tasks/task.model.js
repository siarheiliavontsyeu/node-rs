const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task',
    order = 0,
    description = 'test',
    userId = 'test',
    boardId = 'test',
    columnId = 'test'
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.title = title;
    this.order = order;
    this.description = description;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
