import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const TEMP_FOLDER_NAME = 'temp'
const UPLOADS_FOLDER_NAME = 'uploads'
const PREVIOUS_FOLDER = '..'
const RANDOM_BYTES_TEN_SIZE = 10
const RANDOM_BYTES_HEX_ENCODING = 'hex'

const tempFolder = path.resolve(
  __dirname,
  PREVIOUS_FOLDER,
  PREVIOUS_FOLDER,
  TEMP_FOLDER_NAME
)

const uploadsFolder = path.resolve(
  __dirname,
  PREVIOUS_FOLDER,
  PREVIOUS_FOLDER,
  UPLOADS_FOLDER_NAME
)

export const uploadConfig = {
  tempFolder: tempFolder,
  uploadsFolder: uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename: (_req, file, callback) => {
        const fileHash = crypto
          .randomBytes(RANDOM_BYTES_TEN_SIZE)
          .toString(RANDOM_BYTES_HEX_ENCODING)

        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  }
}

export const uploadMiddleware = multer(uploadConfig.multer)
