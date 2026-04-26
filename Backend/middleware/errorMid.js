const errorMid = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error";
  const stk = err.stack;

  res.status(statusCode).json({
    success: false,
    message,
    stk,
  });
};

module.exports = errorMid;
