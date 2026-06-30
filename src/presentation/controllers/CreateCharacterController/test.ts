import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { Character } from 'src/domain/entities/Character'
import { mockCharacterRepository } from 'src/domain/entities/Character/repository.mock'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'
import { CreateCharacterController } from '.'
import { mockValidation } from 'src/presentation/validation/mock'
import { HTTPValidationError } from 'src/presentation/errors/HTTPValidationError'
import { ErrorResponse } from '..'

describe('CreateCharacterController', () => {
  it('should be able to create a character', async () => {
    const createCharacterInput = {
      name: 'John Doe',
    }

    const characterRepository = mockCharacterRepository()
    characterRepository.create.mockResolvedValue(
      new Character('1', 'John Doe', new HitPoints(100, 100), true),
    )
    const createCharacterUseCase = new CreateCharacterUseCase(
      characterRepository,
    )
    const controller = new CreateCharacterController(
      createCharacterUseCase,
      mockValidation(),
    )
    const response = await controller.execute(createCharacterInput)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({ name: 'John Doe' }),
    )
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
    expect(response.body).toEqual({
      name: {
        message: 'Name is required',
      },
    })
  })
})
