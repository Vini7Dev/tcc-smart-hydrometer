import { injectable } from 'tsyringe'

interface UseCaseProps {
  name: string
  email: string
  password: string
  avatar_file?: string
}

@injectable()
export class CreateAdminUseCase {
  public async execute(payload: UseCaseProps) {
    return true
  }
}
