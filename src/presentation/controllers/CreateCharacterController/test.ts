import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { mockCharacterRepository } from 'src/domain/entities/Character/repository.mock'
import { CreateCharacterController } from '.'
import { mockValidation } from 'src/presentation/validation/mock'
import { HTTPValidationError } from 'src/presentation/errors/HTTPValidationError'
import { ErrorResponse } from '..'

describe('CreateCharacterController', () => {
  it('should be able to create a character', async () => {
    const createCharacterInput = {
      name: 'John Doe',
    }

    const createCharacterUseCase = new CreateCharacterUseCase(
      mockCharacterRepository(),
    )
    const controller = new CreateCharacterController(
      createCharacterUseCase,
      mockValidation(),
    )
    const response = await controller.execute(createCharacterInput)
    expect(response.statusCode).toBe(201)
    expect(response.body).toBe('John Doe')
  })

  it('should not be able to create a character with invalid input', async () => {
    const createCharacterInput = {
      name: '',
    }

    const createCharacterUseCase = new CreateCharacterUseCase(
      mockCharacterRepository(),
    )
    const validation = mockValidation()
    validation.validate.mockImplementation(() => {
      throw new HTTPValidationError({
        name: {
          message: 'Name is required',
        },
      })
    })
    const controller = new CreateCharacterController(
      createCharacterUseCase,
      validation,
    )

    const response = (await controller.execute(
      createCharacterInput,
    )) as ErrorResponse

    expect(response.statusCode).toBe(400)
    expect(response.code).toBe('VALIDATION_ERROR')
    expect(response.body).toBe({
      name: {
        message: 'Name is required',
      },
    })
  })
})
