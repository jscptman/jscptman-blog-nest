import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (keys: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let cookieObj: { [index: string]: unknown } = {};
    if (keys.length) {
      keys.forEach((key) => (cookieObj[key] = request.cookies?.[key]));
    } else {
      cookieObj = request.cookies ?? {};
    }
    return cookieObj;
  },
);
