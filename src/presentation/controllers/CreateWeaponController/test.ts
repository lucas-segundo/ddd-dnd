import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { Weapon } from 'src/domain/entities/Weapon'
import { mockWeaponRepository } from 'src/domain/entities/Weapon/repository.mock'
import { ValidationError } from 'src/domain/errors/ValidationError'
import { DiceDie } from 'src/domain/valueObjects/Dice'
import { mockValidation } from 'src/presentation/validation/mock'
import { CreateWeaponController } from '.'

describe('CreateWeaponController', () => {
  it('should be able to create a weapon', async () => {
    const createWeaponInput = {
      name: 'Sword',
      damageDie: { quantity: 1, sides: 6 },
    }

    const weaponRepository = mockWeaponRepository()
    weaponRepository.create.mockResolvedValue(
      new Weapon('1', 'Sword', new DiceDie(1, 6)),
    )
    const createWeaponUseCase = new CreateWeaponUseCase(weaponRepository)
    const controller = new CreateWeaponController(
      createWeaponUseCase,
      mockValidation(),
    )
    const response = await controller.execute(createWeaponInput)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: '1',
      name: 'Sword',
      damageDie: { quantity: 1, sides: 6 },
    })
  })

  it('should not be able to create a weapon with invalid input', async () => {
    const createWeaponInput = {
      name: '',
      damageDie: { quantity: 1, sides: 6 },
    }

    const createWeaponUseCase = new CreateWeaponUseCase(mockWeaponRepository())
    const validation = mockValidation()
    validation.validate.mockImplementation(() => {
      throw new ValidationError('VALIDATION_ERROR', {
        name: {
          message: 'Name is required',
        },
      })
    })
    const controller = new CreateWeaponController(
      createWeaponUseCase,
      validation,
    )

    await expect(controller.execute(createWeaponInput)).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      body: {
        name: {
          message: 'Name is required',
        },
      },
    })
  })
})
