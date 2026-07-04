import { DiceDie } from 'src/domain/valueObjects/Dice'

export class Weapon {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly damageDie: DiceDie,
  ) {}

  rollDamageDie(): number {
    return this.damageDie.roll()
  }
}
