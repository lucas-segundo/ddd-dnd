import { HitPoints } from '../../valueObjects/HitPoints'
import { Character, DamageToDeadCharacterError } from '.'
import { Equipament } from 'src/domain/valueObjects/Equipament'
import { DiceDie } from 'src/domain/valueObjects/Dice'
import { Weapon } from '../Weapon'

describe('Character', () => {
  const character = new Character(
    '1',
    'John Doe',
    new HitPoints(100, 100),
    new Equipament(new Weapon('1', 'Sword', new DiceDie(1, 6))),
    true,
  )

  it('should be able to take damage', () => {
    character.takeDamage(10)
    expect(character.hitPoints.current).toBe(90)
  })

  it('should not be able to take damage if the character is dead', () => {
    expect(() => character.takeDamage(10)).toThrow(DamageToDeadCharacterError)
  })

  it('should be able to take damage until the character is dead', () => {
    character.takeDamage(200)
    expect(character.isAlive).toBe(false)
  })
})
