import nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

@Injectable()
export class EmailSenderService {
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      pool: configService.get<string>('EMAIL_POOL'),
      host: configService.get<string>('EMAIL_HOST'),
      port: configService.get<string>('EMAIL_PORT'),
      secure: configService.get<string>('EMAIL_SECURE'),
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASS'),
      },
    } as unknown as SMTPTransport.Options);
  }

  async sendEmail(
    emails: string[],
    subject: string,
    message: string,
    html?: string,
  ): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '<kudr9shov@yandex.ru>',
      to: emails.join(),
      subject: subject,
      text: message,
      html: html,
    });
    if (!info) {
      console.log('error sending email');
      return;
    }
    console.log('Message sent: %s', info.messageId);
  }
}
