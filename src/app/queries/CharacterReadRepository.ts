import { CharacterReadModel } from 'src/app/readModels/Character'

export const CHARACTER_INCLUDES = ['mainHand'] as const
export type CharacterInclude = (typeof CHARACTER_INCLUDES)[number]

export interface CharacterQueryParams {
  include?: CharacterInclude[]
}

export interface CharacterReadRepository {
  findById(
    id: string,
    params: CharacterQueryParams,
  ): Promise<CharacterReadModel | null>
}
