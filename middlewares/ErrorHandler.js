export class CustomError extends Error {
  constructor(message = "Internal Server Error", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
