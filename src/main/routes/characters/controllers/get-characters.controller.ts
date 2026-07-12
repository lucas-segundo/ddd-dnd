import { Controller, Get, Inject, Query } from '@nestjs/common'
import {
  CharacterInclude,
  CharacterReadRepository,
} from 'src/app/queries/CharacterReadRepository'
import { parseIncludeQueryParams } from 'src/main/utils/queryParams'
import { z } from 'zod'

@Controller('characters')
export class GetCharactersRouteController {
  constructor(
    @Inject('CHARACTER_READ_REPOSITORY')
    private readonly characterReadRepository: CharacterReadRepository,
  ) {}

  @Get()
  async getAll(@Query() query: Query) {
    const parsed = schema.parse(query)

    return this.characterReadRepository.findAll({
      where: {
        name: {
          contains: parsed.name,
        },
        isAlive: {
          eq: parsed.isAlive,
        },
        hitPoints: {
          gte: parsed.hitPoints?.gte,
          lte: parsed.hitPoints?.lte,
        },
      },
      pagination: {
        page: parsed.page,
        perPage: parsed.perPage,
      },
      include: parsed.include,
    })
  }
}

export interface Query {
  include?: string
  page?: string
  perPage?: string
  name?: string
  isAlive?: string
  hitPoints?: {
    gte?: string
    lte?: string
  }
}

export const schema = z.object({
  include: z
    .string()
    .transform(parseIncludeQueryParams<CharacterInclude[]>)
    .optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().optional().default(10),
  name: z.string().optional(),
  isAlive: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
  hitPoints: z
    .object({
      gte: z.coerce.number().int().optional(),
      lte: z.coerce.number().int().optional(),
    })
    .optional(),
})
