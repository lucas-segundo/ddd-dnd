import {
  Character as PrismaCharacter,
  Weapon as PrismaWeapon,
} from 'generated/prisma/client'
import { Character } from 'src/domain/entities/Character'
import { Weapon } from 'src/domain/entities/Weapon'
import { DiceDie } from 'src/domain/valueObjects/Dice'
import { Equipament } from 'src/domain/valueObjects/Equipament'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'

interface Input extends PrismaCharacter {
  mainHand: PrismaWeapon
}

export class PrismaCharacterMapper {
  static toEntity(input: Input): Character {
    return new Character(
      input.id,
      input.name,
      new HitPoints(input.hitPoints, input.maxHitPoints),
      new Equipament(input.mainHand ? this.mapWeapon(input.mainHand) : null),
      input.isAlive,
    )
  }

  static mapWeapon(weapon: PrismaWeapon): Weapon {
    return new Weapon(
      weapon.id,
      weapon.name,
      new DiceDie(weapon.damageDieQuantity, weapon.damageDieSides),
    )
  }
}
