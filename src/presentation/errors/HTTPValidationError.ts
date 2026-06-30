import { HTTPError, HTTPStatusCode } from './HTTPError'

export class HTTPValidationError extends HTTPError {
  constructor(body: unknown) {
    super('VALIDATION_ERROR', body, HTTPStatusCode.BAD_REQUEST)
  }
}
