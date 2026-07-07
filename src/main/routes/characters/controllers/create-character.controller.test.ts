import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'
import { CreateCharacterRouteController } from './create-character.controller'

describe('CreateCharacterRouteController', () => {
  describe('create', () => {
    it('should be able to create a character', async () => {
      const createCharacterController = {
        execute: jest.fn().mockResolvedValue({
          statusCode: 201,
          body: { id: '1' },
        }),
      } as unknown as CreateCharacterController

      const controller = new CreateCharacterRouteController(
        createCharacterController,
      )

      const result = await controller.create({ name: 'John Doe' })

      expect(result).toEqual({ id: '1' })
      expect(createCharacterController.execute).toHaveBeenCalledWith({
        name: 'John Doe',
      })
    })
  })
})
