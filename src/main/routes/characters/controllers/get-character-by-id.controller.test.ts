import { mockCharacterReadRepository } from 'src/app/queries/CharacterReadRepository.mock'
import { NotFoundError } from 'src/domain/errors/NotFoundError'
import { GetCharacterByIdRouteController } from './get-character-by-id.controller'

describe('GetCharacterByIdRouteController', () => {
  describe('getById', () => {
    it('should be able to get a character by id', async () => {
      const characterReadRepository = mockCharacterReadRepository()
      characterReadRepository.findById.mockResolvedValue({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        hitPoints: 100,
        maxHitPoints: 100,
        isAlive: true,
      })

      const controller = new GetCharacterByIdRouteController(
        characterReadRepository,
      )

      const result = await controller.getById(
        '550e8400-e29b-41d4-a716-446655440000',
        { include: 'mainHand' },
      )

      expect(result).toEqual({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        hitPoints: 100,
        maxHitPoints: 100,
        isAlive: true,
      })
      expect(characterReadRepository.findById).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        { include: ['mainHand'] },
      )
    })

    it('should throw NotFoundError when character does not exist', async () => {
      const characterReadRepository = mockCharacterReadRepository()
      characterReadRepository.findById.mockResolvedValue(null)

      const controller = new GetCharacterByIdRouteController(
        characterReadRepository,
      )

      await expect(
        controller.getById('550e8400-e29b-41d4-a716-446655440000', {}),
      ).rejects.toBeInstanceOf(NotFoundError)
    })
  })
})
