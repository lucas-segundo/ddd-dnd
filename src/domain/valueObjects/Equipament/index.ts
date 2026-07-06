import { Weapon } from 'src/domain/entities/Weapon'

export class Equipament {
  constructor(public readonly mainHand: Weapon | null) {}
}
