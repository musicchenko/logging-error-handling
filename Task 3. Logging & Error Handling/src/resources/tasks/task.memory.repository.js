const getAll = async (boardId, taskId = null) => {
  // TODO: mock implementation. should be replaced during task development
  let filteredTasks = tasks.filter((val) => {
    if(val.boardId === boardId) {
      if(taskId) {
        if(val.id !== taskId) {
          return false;
        }
      }
      return true;
    }
  });
  return filteredTasks;
};

let tasks = [];

module.exports = { getAll, tasks };
