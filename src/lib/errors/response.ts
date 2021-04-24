export type ResponseError = {
  statusCode: number
  message: string
}

class ErrorResponse extends Error {
  readonly statusCode: number
  readonly message: string

  constructor({ message, statusCode }: ResponseError) {
    super(message)
    this.statusCode = statusCode
  }
}

export default ErrorResponse
