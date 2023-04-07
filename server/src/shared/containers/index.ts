import './providers'

import { container } from 'tsyringe'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'
import { ForgotPasswordTokensRepository } from '@modules/users/infra/prisma/repositories/ForgotPasswordTokensRepository'
import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { NewsRepository } from '@modules/news/infra/prisma/repositories/NewsRepository'
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { HydrometersRepository } from '@modules/hydrometers/infra/prisma/repositories/HydrometersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IForgotPasswordTokensRepository>('ForgotPasswordTokensRepository', ForgotPasswordTokensRepository)
container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository)
container.registerSingleton<IHydrometersRepository>('HydrometersRepository', HydrometersRepository)
