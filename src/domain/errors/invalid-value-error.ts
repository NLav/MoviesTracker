export class InvalidValueError extends Error {
  constructor() {
    super("Invalid value!");
    this.name = "InvalidValueError";
  }
}
