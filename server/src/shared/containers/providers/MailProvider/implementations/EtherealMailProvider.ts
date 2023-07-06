import nodemailer, { Transporter } from 'nodemailer'

import { mailConfig } from '@configs/mail'
import { ISendMailDTO } from '../dtos/ISendMailDTO'
import { IMailProvider } from '../models/IMailProvider'

const { defaults } = mailConfig

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: { rejectUnauthorized: false }
      })

      this.client = transporter
    })
  }

  public async sendMail({
    to,
    from = defaults.from,
    subject,
    html,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: `${from.name} <${from.email}>`,
      to: `${to.name} <${to.email}>`,
      subject,
      html
    })

    console.log('====>', message.messageId)
    console.log('====>', nodemailer.getTestMessageUrl(message))
  }
}
