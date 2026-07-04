import { ValidationError } from 'src/domain/errors/ValidationError'

export class DiceDie {
  constructor(
    public readonly quantity: number,
    public readonly sides: number,
  ) {
    this.validate()
  }

  private validate(): void {
    if (this.quantity < 1) {
      throw new DiceQuantityLessThanOneError()
    }
    if (this.sides < 1) {
      throw new DiceSidesLessThanOneError()
    }
  }

  roll(): number {
    let result = 0
    for (let i = 0; i < this.quantity; i++) {
      result += Math.floor(Math.random() * this.sides) + 1
    }

    return result
  }
}

export class DiceSidesLessThanOneError extends ValidationError {
  constructor() {
    super('DICE_SIDES_LESS_THAN_ONE', 'Dice sides cannot be less than 1')
  }
}

export class DiceQuantityLessThanOneError extends ValidationError {
  constructor() {
    super('DICE_QUANTITY_LESS_THAN_ONE', 'Dice quantity cannot be less than 1')
  }
}
