// Takes a function as a argument and the inner function has functionality for
// express as it takes and send api response //

const middleware = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = middleware;
