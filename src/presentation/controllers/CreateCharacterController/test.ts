import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { Character } from 'src/domain/entities/Character'
import { mockCharacterRepository } from 'src/domain/entities/Character/repository.mock'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'
import { CreateCharacterController } from '.'
import { mockValidation } from 'src/presentation/validation/mock'
import { ValidationError } from 'src/domain/errors/ValidationError'
import { Equipament } from 'src/domain/valueObjects/Equipament'

describe('CreateCharacterController', () => {
  it('should be able to create a character', async () => {
    const createCharacterInput = {
      name: 'John Doe',
    }

    const characterRepository = mockCharacterRepository()
    characterRepository.create.mockResolvedValue(
      new Character(
        '1',
        'John Doe',
        new HitPoints(100, 100),
        new Equipament(null),
        true,
      ),
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
    expect(response.body).toEqual({ id: '1' })
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
      throw new ValidationError('VALIDATION_ERROR', {
        name: {
          message: 'Name is required',
        },
      })
    })
    const controller = new CreateCharacterController(
      createCharacterUseCase,
      validation,
    )

    await expect(
      controller.execute(createCharacterInput),
    ).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      body: {
        name: {
          message: 'Name is required',
        },
      },
    })
  })
})
