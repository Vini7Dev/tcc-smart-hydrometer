import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateNewsUseCase } from './CreateNewsUseCase'

export class CreateNewsController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const { title, text } = request.body
    const newsImageFiles = request.files as any[]

    const newsImageFileNames = newsImageFiles.map(
      (newsImageFile: any) => newsImageFile.filename
    )

    const createNewsUseCase = container.resolve(CreateNewsUseCase)

    const createdNews = await createNewsUseCase.execute({
      authenticatedUserId,
      title,
      text,
      image_files: newsImageFileNames,
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdNews)
  }
}
