import { container } from 'tsyringe'
import { SeleniumProvider } from './CrawlerProvider/implementations/SeleniumProvider'
import { ICrawlerProvider } from './CrawlerProvider/models/ICrawlerProvider'

import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from './HashProvider/models/IHashProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { IMailProvider } from './MailProvider/models/IMailProvider'
import { BullProvider } from './QueueProvider/implementation/BullProvider'
import { IQueueProvider } from './QueueProvider/models/IQueueProvider'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider())
container.registerInstance<ICrawlerProvider>('CrawlerProvider', new SeleniumProvider())
container.register<IQueueProvider>('QueueProvider', BullProvider)
