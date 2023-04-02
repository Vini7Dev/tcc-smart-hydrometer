import './providers'

import { container } from 'tsyringe'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'
import { ForgotPasswordTokensRepository } from '@modules/users/infra/prisma/repositories/ForgotPasswordTokensRepository'
import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { NewsRepository } from '@modules/news/infra/prisma/repositories/NewsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IForgotPasswordTokensRepository>('ForgotPasswordTokensRepository', ForgotPasswordTokensRepository)
container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository)
