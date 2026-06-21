import { CharacterRepository } from './repository'

export const mockCharacterRepository =
  (): jest.Mocked<CharacterRepository> => ({
    create: jest.fn(),
  })
