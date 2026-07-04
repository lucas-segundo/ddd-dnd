import { Weapon as PrismaWeapon } from 'generated/prisma/client'
import { Weapon } from 'src/domain/entities/Weapon'
import { DiceDie } from 'src/domain/valueObjects/Dice'

export class PrismaWeaponMapper {
  static toEntity(weapon: PrismaWeapon): Weapon {
    return new Weapon(
      weapon.id,
      weapon.name,
      new DiceDie(weapon.damageDieQuantity, weapon.damageDieSides),
    )
  }
}
