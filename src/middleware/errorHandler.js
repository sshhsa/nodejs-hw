import createHttpError from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: err.message,
  });
};
