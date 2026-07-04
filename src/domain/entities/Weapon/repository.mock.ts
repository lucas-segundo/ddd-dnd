import { WeaponRepository } from './repository'

export const mockWeaponRepository = (): jest.Mocked<WeaponRepository> => ({
  create: jest.fn(),
})
