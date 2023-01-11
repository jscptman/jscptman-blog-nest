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
  verifyTransport() {
    this.transport.verify(function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
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
