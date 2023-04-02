interface ISenderProps {
  name: string
  email: string
}

export interface ISendMailDTO {
  to: ISenderProps
  from?: ISenderProps
  subject: string
  html: string
}
