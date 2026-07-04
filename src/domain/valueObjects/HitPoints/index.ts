import { ValidationError } from 'src/domain/errors/ValidationError'

export class HitPoints {
  constructor(
    readonly current: number,
    readonly max: number,
  ) {
    this.validate()
  }

  private validate(): void {
    if (this.current < 0) {
      throw new HitPointsLessThanZeroError()
    }
    if (this.current > this.max) {
      throw new HitPointsGreaterThanMaxHitPointsError()
    }
  }

  takeDamage(damage: number): HitPoints {
    if (damage < 0) throw new DamageLessThanZeroError()
    const newCurrent = this.current - damage

    if (newCurrent < 0) {
      return new HitPoints(0, this.max)
    }

    return new HitPoints(newCurrent, this.max)
  }
}

export class HitPointsLessThanZeroError extends ValidationError {
  constructor() {
    super('HIT_POINTS_LESS_THAN_ZERO', 'Hit points cannot be less than 0')
  }
}

export class HitPointsGreaterThanMaxHitPointsError extends ValidationError {
  constructor() {
    super(
      'HIT_POINTS_GREATER_THAN_MAX_HIT_POINTS',
      'Hit points cannot be greater than max hit points',
    )
  }
}

export class DamageLessThanZeroError extends ValidationError {
  constructor() {
    super('DAMAGE_LESS_THAN_ZERO', 'Hit points damage cannot be less than 0')
  }
}
