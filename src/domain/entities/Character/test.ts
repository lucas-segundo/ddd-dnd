import { HitPoints } from '../../valueObjects/HitPoints'
import { Character, DamageToDeadCharacterError } from '.'

describe('Character', () => {
  it('should be able to take damage', () => {
    const character = new Character(
      '1',
      'John Doe',
      new HitPoints(100, 100),
      true,
    )
    character.takeDamage(10)
    expect(character.hitPoints.current).toBe(90)
  })

  it('should not be able to take damage if the character is dead', () => {
    const character = new Character(
      '1',
      'John Doe',
      new HitPoints(100, 100),
      false,
    )
    expect(() => character.takeDamage(10)).toThrow(DamageToDeadCharacterError)
  })

  it('should be able to take damage until the character is dead', () => {
    const character = new Character(
      '1',
      'John Doe',
      new HitPoints(100, 100),
      true,
    )
    character.takeDamage(200)
    expect(character.isAlive).toBe(false)
  })
})
