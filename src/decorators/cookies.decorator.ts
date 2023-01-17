/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-05 10:47:31
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 13:26:21
 * @FilePath: /jscptman-blog-nest/src/decorators/cookies.decorator.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (keys: string[] | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let cookieObj: { [index: string]: any } = {};
    if (Array.isArray(keys) && keys.length) {
      keys.forEach((key) => (cookieObj[key] = request.cookies?.[key]));
    } else {
      cookieObj = request.cookies ?? {};
    }
    return cookieObj;
  },
);
