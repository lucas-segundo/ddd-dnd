import { CharacterReadRepository } from './CharacterReadRepository'

export const mockCharacterReadRepository =
  (): jest.Mocked<CharacterReadRepository> => ({
    findById: jest.fn(),
  })
