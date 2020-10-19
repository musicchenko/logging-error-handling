const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

function addBoard(board) {
  boardsRepo.boards.push(board);
  return board
}

function updateBoard(id, params) {
  console.log(boardsRepo.boards);
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
      boardsRepo.boards.splice(i, 1);
      return true;
    }
  }
  return false;
}

module.exports = { getAll, addBoard, updateBoard, deleteBoard };
