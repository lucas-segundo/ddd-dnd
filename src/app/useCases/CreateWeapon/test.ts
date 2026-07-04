import { CreateWeaponUseCase } from '.'
import { Weapon } from 'src/domain/entities/Weapon'
import { mockWeaponRepository } from 'src/domain/entities/Weapon/repository.mock'
import { DiceDie } from 'src/domain/valueObjects/Dice'

describe('CreateWeaponUseCase', () => {
  it('should be able to create a weapon', async () => {
    const weaponRepository = mockWeaponRepository()
    weaponRepository.create.mockResolvedValue(
      new Weapon('1', 'Sword', new DiceDie(1, 6)),
    )

    const createWeaponUseCase = new CreateWeaponUseCase(weaponRepository)
    const weapon = await createWeaponUseCase.execute({
      name: 'Sword',
      damageDie: { quantity: 1, sides: 6 },
    })

    expect(weapon.name).toBe('Sword')
  })
})
