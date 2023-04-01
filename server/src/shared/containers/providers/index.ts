import { container } from 'tsyringe'

import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from './HashProvider/models/IHashProvider'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
