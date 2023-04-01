import fs from 'fs'
import path from 'path'

import { uploadConfig } from '@configs/upload'
import { IStorageProvider } from '../models/IStorageProvider'

const { tempFolder, uploadsFolder } = uploadConfig

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(fileName: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(tempFolder, fileName),
      path.resolve(uploadsFolder, fileName),
    )

    return fileName
  }
}
