/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-09 22:32:51
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-15 20:10:21
 * @FilePath: /jscptman-blog-nest/src/common/email/email.template.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
export function createEmailTemplate(randomNumber: number): string {
  const randomNumberStr = randomNumber.toString();
  return `<!DOCTYPE html>
  <html lang="zh">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
    </head>
    <div style="margin: 0; min-height: 700px;">
      <div style="padding: 20px 10%; height: 100%">
        <div
          style="
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 590px;
            height: 425px;
            margin: auto;
            font-size: 23px;
            border-radius: 16px;
            padding: 14px 36px;
            text-align: center;
            border-width: 1px;
            border-style: solid;
            border-color: #5c5c5c;
            padding-bottom: 60px;
          "
        >
          <div>
            <h1 style="white-space: nowrap">
              <b style="font-style: italic; margin-right: 12px; font-size: 30px;
              "
                >验证码:</b
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[0]}</strong
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[1]}</strong
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[2]}</strong
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[3]}</strong
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[4]}</strong
              >
              <strong style="font-style: italic; border-bottom: 1px solid"
                >${randomNumberStr[5]}</strong
              >
            </h1>
          </div>
          <div>
            <div style="font-size: 20px; text-align: left; letter-spacing: 2px">
              <p style="text-indent: 2em; padding: 4px 0; padding: 0 20px">
                欢迎光临我的博客, 请复制上方验证码以完成注册, 验证码有效期为10分钟.
              </p>
              <p
                style="
                  text-indent: 2em;
                  padding: 4px 0;
                  padding: 0 20px;
                  line-height: 1.9;
                "
              >
                如果您在浏览时遇到问题或有建议, 欢迎反馈, 联系方式如下:
              </p>
              <ul style="padding-left: 2em;">
                <li style="padding-bottom: 8px">
                  Email:
                  <a href="mailto:jscptman@gmail.com">jscptman@gmail.com</a>
                </li>
                <li>
                  Github:
                  <a href="https://github.com/jscptman"
                    >https://github.com/jscptman</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div style="text-align: right; font-size: 20px; padding-right: 20px; letter-spacing: 2px;">
            祝您浏览愉快!
          </div>
        </div>
      </div>
    </div>
  </html>`;
}
