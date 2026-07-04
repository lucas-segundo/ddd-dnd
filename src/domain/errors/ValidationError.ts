export class ValidationError extends Error {
  constructor(
    public readonly code: string,
    public readonly body: unknown,
  ) {
    super(`${code}: ${JSON.stringify(body)}`)
  }
}
