import { mockCharacterReadRepository } from 'src/app/queries/CharacterReadRepository.mock'
import { GetCharactersRouteController } from './get-characters.controller'

describe('GetCharactersRouteController', () => {
  describe('getAll', () => {
    it('should be able to list characters', async () => {
      const characterReadRepository = mockCharacterReadRepository()
      characterReadRepository.findAll.mockResolvedValue([
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'John Doe',
          hitPoints: 100,
          maxHitPoints: 100,
          isAlive: true,
        },
      ])

      const controller = new GetCharactersRouteController(
        characterReadRepository,
      )

      const result = await controller.getAll({
        include: 'mainHand',
        page: '1',
        perPage: '10',
        name: 'John',
        isAlive: 'true',
        hitPointsGte: '1',
        hitPointsLte: '100',
      })

      expect(result).toEqual([
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'John Doe',
          hitPoints: 100,
          maxHitPoints: 100,
          isAlive: true,
        },
      ])
      expect(characterReadRepository.findAll).toHaveBeenCalledWith({
        include: ['mainHand'],
        pagination: { page: 1, perPage: 10 },
        where: {
          name: { contains: 'John' },
          isAlive: { eq: true },
          hitPoints: { gte: 1, lte: 100 },
        },
      })
    })

    it('should list characters with empty query params', async () => {
      const characterReadRepository = mockCharacterReadRepository()
      characterReadRepository.findAll.mockResolvedValue([])

      const controller = new GetCharactersRouteController(
        characterReadRepository,
      )

      const result = await controller.getAll({})

      expect(result).toEqual([])
      expect(characterReadRepository.findAll).toHaveBeenCalledWith({
        include: undefined,
        pagination: undefined,
        where: {
          name: { contains: undefined },
          isAlive: { eq: undefined },
          hitPoints: { gte: undefined, lte: undefined },
        },
      })
    })
  })
})
