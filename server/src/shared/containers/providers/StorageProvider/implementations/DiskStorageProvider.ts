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

  public async deleteFile(fileName: string): Promise<void> {
    const fileDir = path.resolve(uploadConfig.uploadsFolder, fileName)

    try {
      await fs.promises.stat(fileDir)
    } catch {
      return
    }

    await fs.promises.unlink(fileDir)

    return
  }
}
