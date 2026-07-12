import { CharacterReadModel } from 'src/app/models/Character'

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

  findAll(params: FindAllParams): Promise<CharacterReadModel[]>
}

export interface FindAllParams {
  where?: Where
  limit?: number
  offset?: number
  include?: CharacterInclude[]
}

interface Where {
  name?: {
    contains: string
  }
  hitPoints?: {
    gte: number
    lte: number
  }
  isAlive?: {
    eq: boolean
  }
}
