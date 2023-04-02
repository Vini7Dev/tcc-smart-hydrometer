import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IMailProvider } from '@shared/containers/providers/MailProvider/models/IMailProvider'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'

interface IUseCaseProps {
  email: string
}

const VERIFY_EMAIL_MESSAGE = 'We sent you an email to reset your account password!'
const RESET_PASSWORD_MAIL_SUBJECT = 'Reset Password'
const FORGOT_PASSWORD_PAGE_BASE_URL = 'http://localhost:3333/password/forgot'
const RESET_PASSWORD_MAIL_HTML = (token: string) =>
  `Click <strong><a href="${FORGOT_PASSWORD_PAGE_BASE_URL}/${token}" target="_blank">here</a></strong> to reset your password`

@injectable()
export class ForgotPasswordUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ForgotPasswordTokensRepository')
    private forgotPasswordTokensRepository: IForgotPasswordTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IUseCaseProps) {
    const userForgotPassword = await this.usersRepository.findByEmail(email)

    if (!userForgotPassword) {
      return { message: VERIFY_EMAIL_MESSAGE }
    }

    const tokenAlreadyExists = await this.forgotPasswordTokensRepository.findByUserId(
      userForgotPassword.id
    )

    if (tokenAlreadyExists) {
      await this.forgotPasswordTokensRepository.delete(tokenAlreadyExists.id)
    }

    const createdForgotPasswordToken = await this.forgotPasswordTokensRepository.create({
      user_id: userForgotPassword.id
    })

    this.mailProvider.sendMail({
      to: {
        name: userForgotPassword.name,
        email: userForgotPassword.email
      },
      subject: RESET_PASSWORD_MAIL_SUBJECT,
      html: RESET_PASSWORD_MAIL_HTML(createdForgotPasswordToken.id),
    })

    return { message: VERIFY_EMAIL_MESSAGE }
  }
}
