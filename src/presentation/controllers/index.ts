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

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
