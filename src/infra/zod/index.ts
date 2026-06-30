import { HTTPValidationError } from 'src/presentation/errors/HTTPValidationError'
import { Validation } from 'src/presentation/validation'
import { z } from 'zod'

export class ZodValidation implements Validation {
  constructor(private readonly schema: z.ZodSchema) {}

  validate(data: unknown): void {
    try {
      this.schema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HTTPValidationError(
          error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        )
      }

      throw error
    }
  }
}
