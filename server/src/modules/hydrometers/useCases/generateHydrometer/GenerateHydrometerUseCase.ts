import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository';
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider';

const DEFAULT_CONSUMPTION_CATEGORY = 'EMPTY'
const DEFAULT_PRE_NAME_STRING = 'HIDRÔMETRO'
const NAME_CRYPTO_RANDOM_LENGTH = 3
const PASSWORD_CRYPTO_RANDOM_LENGTH = 5
const HEX_FORMAT = 'hex'

@injectable()
export class GenerateHydrometerUseCase {
  constructor (
    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute() {
    const nameRandom = crypto
      .randomBytes(NAME_CRYPTO_RANDOM_LENGTH)
      .toString(HEX_FORMAT)
      .toUpperCase()

    const nameRandomComplete = `${DEFAULT_PRE_NAME_STRING}-${nameRandom}`

    const passwordRandom = crypto
      .randomBytes(PASSWORD_CRYPTO_RANDOM_LENGTH)
      .toString(HEX_FORMAT)
      .toUpperCase()

    const passwordRandomHash = await this.hashProvider.generateHash(passwordRandom)

    const createdHydrometer = await this.hydrometersRepository.create({
      name: nameRandomComplete,
      password: passwordRandomHash,
      consumption_category: DEFAULT_CONSUMPTION_CATEGORY,
    })

    return {
      id: createdHydrometer.id,
      name: nameRandomComplete,
      password: passwordRandom,
    }
  }
}
