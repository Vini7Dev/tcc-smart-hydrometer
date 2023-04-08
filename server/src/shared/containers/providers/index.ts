import { container } from 'tsyringe'

import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from './HashProvider/models/IHashProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { IMailProvider } from './MailProvider/models/IMailProvider'
import { BullProvider } from './Queue/implementation/BullProvider'
import { IQueue } from './Queue/models/IQueue'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider())
container.register<IQueue>('QueueProvider', BullProvider)
