export interface IUpdateNewsDTO {
  id: string
  title?: string
  text?: string
  image_files_to_add?: string[]
  image_files_to_remove?: string[]
}
