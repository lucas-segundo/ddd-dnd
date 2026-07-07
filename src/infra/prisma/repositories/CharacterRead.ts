import { PrismaClient } from '../../../../generated/prisma/client'
import { CharacterReadModel } from 'src/app/readModels/Character'
import {
  CharacterQueryParams,
  CharacterReadRepository,
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

    return PrismaCharacterReadMapper.toReadModel(record, params.include)
  }
}
