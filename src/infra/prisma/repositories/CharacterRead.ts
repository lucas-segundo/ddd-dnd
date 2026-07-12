import { PrismaClient } from '../../../../generated/prisma/client'
import { CharacterReadModel } from 'src/app/models/Character'
import {
  CharacterQueryParams,
  CharacterReadRepository,
  FindAllParams,
} from 'src/app/queries/CharacterReadRepository'
import { PrismaCharacterReadMapper } from '../mappers/CharacterRead'

export class PrismaCharacterReadRepository implements CharacterReadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(
    id: string,
    params: CharacterQueryParams,
  ): Promise<CharacterReadModel | null> {
    const record = await this.prisma.character.findUnique({
      where: { id },
      include: {
        mainHand: params.include?.includes('mainHand'),
      },
    })

    return PrismaCharacterReadMapper.toModel(record, params.include)
  }

  async findAll(params: FindAllParams): Promise<CharacterReadModel[]> {
    const records = await this.prisma.character.findMany({
      where: {
        ...params.where,
        isAlive: params.where?.isAlive?.eq,
      },
      skip: (params.pagination?.page - 1) * params.pagination?.perPage,
      take: params.pagination?.perPage,
      include: {
        mainHand: params.include?.includes('mainHand'),
      },
    })

    return records.map((record) =>
      PrismaCharacterReadMapper.toModel(record, params.include),
    )
  }
}
