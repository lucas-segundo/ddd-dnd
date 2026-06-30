export interface Controller {
  execute(input: unknown): Promise<Response | ErrorResponse>
}

export interface Response {
  body: unknown
  statusCode: number
}

export interface ErrorResponse {
  code: string
  body: unknown
  statusCode: number
}
