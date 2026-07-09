import {
  Character as PrismaCharacter,
  Weapon as PrismaWeapon,
} from 'generated/prisma/client'
import { CharacterReadModel } from 'src/app/models/Character'
import { CharacterInclude } from 'src/app/queries/CharacterReadRepository'

type PrismaCharacterWithMainHand = PrismaCharacter & {
  mainHand?: PrismaWeapon | null
}

export class PrismaCharacterReadMapper {
  static toReadModel(
    record: PrismaCharacterWithMainHand,
    include: CharacterInclude[] = [],
  ): CharacterReadModel {
    const readModel: CharacterReadModel = {
      id: record.id,
      name: record.name,
      hitPoints: record.hitPoints,
      maxHitPoints: record.maxHitPoints,
      isAlive: record.isActive,
    }

    if (include.includes('mainHand')) {
      readModel.mainHand = record.mainHand
        ? {
            id: record.mainHand.id,
            name: record.mainHand.name,
            damageDie: {
              quantity: record.mainHand.damageDieQuantity,
              sides: record.mainHand.damageDieSides,
            },
          }
        : null
    }

    return readModel
  }
}
