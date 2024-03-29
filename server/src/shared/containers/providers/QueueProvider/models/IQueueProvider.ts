export interface IAddQueueProps {
  name: string
  data: object | object[]
}

export interface IProcessProps {
  providers: object
}

export interface IQueueProvider {
  add(data: IAddQueueProps): Promise<void>
  process(props: IProcessProps): void
}
