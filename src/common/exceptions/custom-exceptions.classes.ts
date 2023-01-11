export default class CustomException {
  constructor(
    private readonly message: Error | object | string,
    private readonly context?: string,
    private readonly stack?: string,
  ) {}

  getMessage() {
    return this.message;
  }

  getStack() {
    return this.stack;
  }

  getContext() {
    return this.context;
  }

  throw() {
    throw this;
  }
}
