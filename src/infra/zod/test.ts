import z from 'zod'
import { ZodValidation } from '.'
import { HTTPValidationError } from 'src/presentation/errors/HTTPValidationError'

describe('ZodValidation', () => {
  it('should be able to validate a schema', () => {
    const schema = z.object({
      name: z.string().min(1),
    })

    const validation = new ZodValidation(schema)
    expect(() => validation.validate({ name: 'John Doe' })).not.toThrow()
  })

  it('should not be able to validate a schema with invalid input', () => {
    const schema = z.object({
      name: z.string().min(1),
    })
    const validation = new ZodValidation(schema)
    expect(() => validation.validate({ name: '' })).toThrow(HTTPValidationError)
  })
})
