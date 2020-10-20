const boardsRepo = require('./board.memory.repository');
let tasks = require('../tasks/task.memory.repository').tasks;

const getAll = () => boardsRepo.getAll();

function addBoard(board) {
  boardsRepo.boards.push(board);
  return board;
}

function updateBoard(id, params) {
  for (let i = 0; i < boardsRepo.boards.length; i++) {
    if (boardsRepo.boards[i].id === id) {
      for (let j = 0; j < Object.keys(boardsRepo.boards[i]).length; j++) {
        if (params[Object.keys(boardsRepo.boards[i])[j]]) {
          boardsRepo.boards[i][Object.keys(boardsRepo.boards[i])[j]] = params[Object.keys(boardsRepo.boards[i])[j]];
        }
      }
      return boardsRepo.boards[i];
    }
  }
  return false;
}

function deleteBoard(id) {
  for (let i = 0; i < boardsRepo.boards.length; i++) {
    if (boardsRepo.boards[i].id === id) {
      let j = tasks.length-1;
      while(j >= 0) {
        if(tasks[j].boardId === id) {
          tasks.splice(j, 1);
        }
        j--;
      }
      boardsRepo.boards.splice(i, 1);
      return true;
    }
  }
  return false;
}

module.exports = { getAll, addBoard, updateBoard, deleteBoard };
