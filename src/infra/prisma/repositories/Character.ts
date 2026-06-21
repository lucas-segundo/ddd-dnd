import { Character } from 'src/domain/entities/Character'
import { CharacterRepository } from 'src/domain/entities/Character/repository'
import { PrismaClient } from '../../../../generated/prisma/client'
import { PrismaCharacterMapper } from '../mappers/Character'
import { Character as PrismaCharacter } from 'generated/prisma/client'

export class PrismaCharacterRepository implements CharacterRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(character: Character): Promise<Character> {
    const record: PrismaCharacter = await this.prisma.character.create({
      data: {
        id: character.id,
        name: character.name,
        hitPoints: character.hitPoints.current,
        maxHitPoints: character.hitPoints.max,
        isActive: character.isAlive,
      },
    })

    return PrismaCharacterMapper.toEntity(record)
  }
}
