import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { CreateWeaponRouteController } from './create-weapon.controller'

describe('CreateWeaponRouteController', () => {
  describe('create', () => {
    it('should be able to create a weapon', async () => {
      const createWeaponUseCase = {
        execute: jest.fn().mockResolvedValue('1'),
      } as unknown as CreateWeaponUseCase

      const controller = new CreateWeaponRouteController(createWeaponUseCase)

      const result = await controller.create({
        name: 'Sword',
        damageDie: { quantity: 1, sides: 6 },
      })

      expect(result).toEqual({ id: '1' })
      expect(createWeaponUseCase.execute).toHaveBeenCalledWith({
        name: 'Sword',
        damageDie: { quantity: 1, sides: 6 },
      })
    })
  })
})
