import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { CreateCharacterRouteController } from './create-character.controller'

describe('CreateCharacterRouteController', () => {
  describe('create', () => {
    it('should be able to create a character', async () => {
      const createCharacterUseCase = {
        execute: jest.fn().mockResolvedValue('1'),
      } as unknown as CreateCharacterUseCase

      const controller = new CreateCharacterRouteController(
        createCharacterUseCase,
      )

      const result = await controller.create({ name: 'John Doe' })

      expect(result).toEqual({ id: '1' })
      expect(createCharacterUseCase.execute).toHaveBeenCalledWith({
        name: 'John Doe',
      })
    })
  })
})
