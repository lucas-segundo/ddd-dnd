import { randomUUID } from 'crypto'
import { Weapon } from 'src/domain/entities/Weapon'
import { WeaponRepository } from 'src/domain/entities/Weapon/repository'
import { DiceDie } from 'src/domain/valueObjects/Dice'

export class CreateWeaponUseCase {
  constructor(private readonly weaponRepository: WeaponRepository) {}

  async execute(input: CreateWeaponInput): Promise<Weapon> {
    const weapon = new Weapon(
      randomUUID(),
      input.name,
      new DiceDie(input.damageDie.quantity, input.damageDie.sides),
    )

    return this.weaponRepository.create(weapon)
  }
}

export interface CreateWeaponInput {
  name: string
  damageDie: {
    quantity: number
    sides: number
  }
}
