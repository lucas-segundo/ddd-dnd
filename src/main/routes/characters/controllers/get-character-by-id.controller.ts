import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import {
  CharacterInclude,
  CharacterReadRepository,
} from 'src/app/queries/CharacterReadRepository'
import { NotFoundError } from 'src/domain/errors/NotFoundError'
import { parseIncludeQueryParams } from 'src/main/utils/queryParams'
import { z } from 'zod'

@Controller('characters')
export class GetCharacterByIdRouteController {
  constructor(
    @Inject('CHARACTER_READ_REPOSITORY')
    private readonly characterReadRepository: CharacterReadRepository,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string, @Query() query: Query) {
    schema.parse({
      id,
      query,
    })

    const include =
      query.include &&
      parseIncludeQueryParams<CharacterInclude[]>(query.include)

    const character = await this.characterReadRepository.findById(id, {
      include,
    })

    if (!character) {
      throw new NotFoundError('CHARACTER_NOT_FOUND', { id })
    }

    return character
  }
}

export interface Query {
  include?: string
}

export const schema = z.object({
  id: z.uuid(),
  query: z.object({
    include: z.string().optional(),
  }),
})
