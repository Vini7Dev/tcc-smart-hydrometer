export interface IStorageProvider {
  saveFile(fileName: string): Promise<string>
}
