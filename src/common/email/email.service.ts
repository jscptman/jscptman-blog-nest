/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-09 17:54:13
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 17:21:26
 * @FilePath: /jscptman-blog-nest/src/common/email/email.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { createEmailTemplate } from './email.template';
import { SentMessageInfo } from 'nodemailer';
@Injectable()
export class EmailService {
  private readonly transport;
  constructor(private readonly configService: ConfigService) {
    this.transport = createTransport(
      configService.get('emailOptions.transportOptions'),
      configService.get('emailOptions.defaultMessageOptions'),
    );
  }

  async sendEmail(verifyCode: number, toAddress: string) {
    const result: {
      verifyCode: number;
      info: SentMessageInfo | null;
    } = { verifyCode, info: null };

    const info = this.transport
      .sendMail({
        ...this.configService.get('emailOptions.defaultMessageOptions'),
        to: toAddress,
        subject: `电子邮件验证码: ${verifyCode}`,
        html: createEmailTemplate(verifyCode),
        watchHtml: `<p style="text-align: center; margin-top: 18px; font-size: 20px;">verifyCode: ${verifyCode}</p>`,
      })
      .then((info) => {
        return info;
      })
      .catch((error: Error) => {
        throw error;
      });
    result.info = await info;
    return result;
  }
}
