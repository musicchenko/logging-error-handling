const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

function addUser(user) {
  usersRepo.users.push(user);
}

function updateUser(id, params) {
  for (let i = 0; i < usersRepo.users.length; i++) {
    if (usersRepo.users[i].id === id) {
      for (let j = 0; j < Object.keys(usersRepo.users[i]).length; j++) {
        if (params[Object.keys(usersRepo.users[i])[j]]) {
          usersRepo.users[i][Object.keys(usersRepo.users[i])[j]] =
            params[Object.keys(usersRepo.users[i])[j]];
        }
      }
      return true;
    }
  }
  return false;
}

function deleteUser(id) {
  for (let i = 0; i < usersRepo.users.length; i++) {
    if (usersRepo.users[i].id === id) {
      usersRepo.users.splice(i, 1);
      return true;
    }
  }
  return false;
}

module.exports = { getAll, addUser, updateUser, deleteUser };
