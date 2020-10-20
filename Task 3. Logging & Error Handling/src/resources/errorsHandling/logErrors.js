function logErrors(err, req, res, next) {
  console.log("Ошибка " + err.stack);
  next(err);
}

module.exports = logErrors;
