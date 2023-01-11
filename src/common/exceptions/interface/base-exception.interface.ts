export interface BaseException {
  message: Error | object | string;
  stack?: string;
  context?: string;
}
