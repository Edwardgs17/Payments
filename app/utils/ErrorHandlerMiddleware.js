const ErrorHandlerMiddleware = module.exports;

ErrorHandlerMiddleware.MainHandler = (err, req, res, next) => {
  const logName = 'ErrorHandlerMiddleware.MainHandler';
  const logger = req.log || console.log;
  logger(logName, `Error with message ${err.message} and stack: ${err.stack}`);
  next(err);

  const { status = 500, message = 'Error', code = 500 } = err;

  return res.status(status).send({ error: { message, code } });
};

ErrorHandlerMiddleware.BaseError = function BaseError(stack, status, message, code) {
  this.message = message;
  this.status = status || code;
  this.code = code;
  this.stack = stack || new Error().stack;
};

ErrorHandlerMiddleware.UnauthorizedError = function UnauthorizedError(message) {
  return new ErrorHandlerMiddleware.BaseError(message, 401, 401);
};

ErrorHandlerMiddleware.BadRequestError = function BadRequestError(message) {
  return new ErrorHandlerMiddleware.BaseError(message, 400, 400);
};
