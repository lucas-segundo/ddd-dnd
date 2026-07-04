import { DiceDie } from 'src/domain/valueObjects/Dice'
import { Weapon } from '.'

describe('Weapon', () => {
  it('should roll a damage die', () => {
    const weapon = new Weapon('1', 'Sword', new DiceDie(1, 6))
    const result = weapon.rollDamageDie()

    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(6)
  })
})
