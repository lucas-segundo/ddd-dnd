export class ValidationError extends Error {
  constructor(
    public readonly code: string,
    public readonly content: unknown,
  ) {
    super(`${code}: ${JSON.stringify(content)}`)
  }
}
