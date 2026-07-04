import {
  DiceDie,
  DiceQuantityLessThanOneError,
  DiceSidesLessThanOneError,
} from '.'

describe('DiceDie', () => {
  it('should throw an error if the quantity is less than 1', () => {
    expect(() => new DiceDie(0, 6)).toThrow(DiceQuantityLessThanOneError)
  })

  it('should throw an error if the sides is less than 1', () => {
    expect(() => new DiceDie(1, 0)).toThrow(DiceSidesLessThanOneError)
  })

  it('should roll a number between 1 and the sides', () => {
    const dice = new DiceDie(2, 6)
    const result = dice.roll()
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThanOrEqual(12)
  })
})
