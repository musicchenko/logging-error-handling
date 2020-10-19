const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getAll();
  const user = users.filter(val => val.id === req.params.id);
  res.json(user[0]);
});

router.route('/').post(async (req, res, next) => {
  const name = req.body.name;
  const login = req.body.login;
  const password = req.body.password;
  const user = new User({ name, login, password });
  await usersService.addUser(user);
  const users = await usersService.getAll();
  const createdUser = users[users.length-1];
  res.json({
    id: createdUser.id,
    name: createdUser.name,
    login: createdUser.login
  });
});

router.route('/:id').put(async (req, res) => {
  let users = await usersService.getAll();
  let user = users.filter(val => val.id === req.body.id);
  if (user.length) {
    usersService.updateUser(user[0].id, req.body);
    users = await usersService.getAll();
    user = users.filter(val => val.id === req.body.id);
  }
  res.json(user);
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.body.id);
  res.sendStatus(200);
});

module.exports = router;
