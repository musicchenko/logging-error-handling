const tasksRepo = require('./task.memory.repository');

const getAll = (boardId, taskId) => tasksRepo.getAll(boardId, taskId);

function addTask(task) {
  tasksRepo.tasks.push(task);
}

function updateTask(id, params) {
  for (let i = 0; i < tasksRepo.tasks.length; i++) {
    if (tasksRepo.tasks[i].id === id) {
      for (let j = 0; j < Object.keys(tasksRepo.tasks[i]).length; j++) {
        if (params[Object.keys(tasksRepo.tasks[i])[j]]) {
          tasksRepo.tasks[i][Object.keys(tasksRepo.tasks[i])[j]] =
            params[Object.keys(tasksRepo.tasks[i])[j]];
        }
      }
      return true;
    }
  }
  return false;
}

function deleteTask(taskId) {
  for (let i = 0; i < tasksRepo.tasks.length; i++) {
    if (tasksRepo.tasks[i].id === taskId) {
      tasksRepo.tasks.splice(i, 1);
      return true;
    }
  }
  return false;
}

module.exports = { getAll, addTask, updateTask, deleteTask };
