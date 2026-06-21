import { HitPoints } from '../../valueObjects/HitPoints'

export class Character {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public hitPoints: HitPoints,
    private _isAlive: boolean,
  ) {}

  takeDamage(damage: number): void {
    const isNotAlive = !this._isAlive
    if (isNotAlive) {
      throw new DamageToDeadCharacterError()
    }

    this.hitPoints = this.hitPoints.takeDamage(damage)
    this._isAlive = this.hitPoints.current > 0
  }

  get isAlive(): boolean {
    return this._isAlive
  }
}

export class DamageToDeadCharacterError extends Error {
  constructor() {
    super('Cannot damage a dead character')
  }
}
