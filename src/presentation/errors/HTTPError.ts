export class HTTPError extends Error {
  constructor(
    public readonly code: string,
    public readonly body: unknown,
    public readonly statusCode: HTTPStatusCode,
  ) {
    super()
  }
}

export enum HTTPStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
