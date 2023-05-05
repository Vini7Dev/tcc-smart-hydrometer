import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateNewsUseCase } from './UpdateNewsUseCase'

export class UpdateNewsController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params
    const { title, text, image_files_to_remove } = request.body
    const newsImageFiles = request.files as any[]

    const newsImageFileNames = newsImageFiles.map(
      (newsImageFile: any) => newsImageFile.filename
    )

    const updateNewsUseCase = container.resolve(UpdateNewsUseCase)

    const createdNews = await updateNewsUseCase.execute({
      id,
      title,
      text,
      image_files: newsImageFileNames,
      image_files_to_remove: image_files_to_remove ? image_files_to_remove.split(',') : [],
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdNews)
  }
}
