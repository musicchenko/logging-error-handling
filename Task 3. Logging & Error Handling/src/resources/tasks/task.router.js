const router = require('express').Router({mergeParams: true});
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getAll(req.params.boardId, req.params.taskId);
  res.status(task.length ? 200 : 404).json(task.length ? task[0] : '');
});

router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const order = req.body.order;
  const description = req.body.description;
  const userId = req.body.userId;
  const boardId = req.params.boardId;
  const columnId = req.body.columnId;
  const task = new Task({ title, order, description, userId, boardId, columnId });
  tasksService.addTask(task);
  res.json(task);
});

router.route('/:taskId').put(async (req, res) => {
  let task = await tasksService.getAll(req.params.boardId, req.params.taskId);
  if (task.length) {
    tasksService.updateTask(task[0].id, req.body);
    task = await tasksService.getAll(req.params.boardId, req.params.taskId);
  }
  res.json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const isDeleted = tasksService.deleteTask(req.params.taskId);
  res.sendStatus(isDeleted ? 200 : 204);
});

module.exports = router;
