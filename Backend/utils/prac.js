// Super runs the constructor of Parent class i.e Error //
// Error.captureStackTrace(this, this.constructor) here this.constructor
// captures the line of error and removes unnecessary error line //
// Using ErrorHandler in next() we transfer message and statusCode of error to global error where they get assigned //

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
