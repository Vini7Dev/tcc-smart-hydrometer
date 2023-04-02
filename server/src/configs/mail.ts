export const mailConfig = {
  defaults: {
    from: {
      name: process.env.MAIL_DEFAULT_NAME ?? 'Support',
      email: process.env.MAIL_DEFAULT_EMAIL ?? 'support@mail.com',
    }
  }
}
