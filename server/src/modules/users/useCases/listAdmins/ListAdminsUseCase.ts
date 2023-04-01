import { injectable, inject } from 'tsyringe'

import { ADMIN_ACCOUNT_TYPE } from '@utils/constants'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

@injectable()
export class ListAdminsUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute() {
    const adminsList = await this.usersRepository.list({
      account_type: ADMIN_ACCOUNT_TYPE,
    })

    return adminsList
  }
}
