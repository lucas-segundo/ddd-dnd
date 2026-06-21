import { Character as PrismaCharacter } from 'generated/prisma/client'
import { Character } from 'src/domain/entities/Character'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'

export class PrismaCharacterMapper {
  static toEntity(character: PrismaCharacter): Character {
    return new Character(
      character.id,
      character.name,
      new HitPoints(character.hitPoints, character.maxHitPoints),
      character.isActive,
    )
  }
}
