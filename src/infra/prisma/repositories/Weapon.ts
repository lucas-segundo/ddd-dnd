import { Weapon as PrismaWeapon } from 'generated/prisma/client'
import { Weapon } from 'src/domain/entities/Weapon'
import { WeaponRepository } from 'src/domain/entities/Weapon/repository'
import { PrismaClient } from '../../../../generated/prisma/client'
import { PrismaWeaponMapper } from '../mappers/Weapon'

export class PrismaWeaponRepository implements WeaponRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(weapon: Weapon): Promise<Weapon> {
    const record: PrismaWeapon = await this.prisma.weapon.create({
      data: {
        id: weapon.id,
        name: weapon.name,
        damageDieQuantity: weapon.damageDie.quantity,
        damageDieSides: weapon.damageDie.sides,
      },
    })

    return PrismaWeaponMapper.toEntity(record)
  }
}
