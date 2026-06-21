import {
  DamageLessThanZeroError,
  HitPoints,
  HitPointsGreaterThanMaxHitPointsError,
  HitPointsLessThanZeroError,
} from '.'

describe('HitPoints', () => {
  it('should be able to take damage', () => {
    const hitPoints = new HitPoints(100, 100)
    const newHitPoints = hitPoints.takeDamage(10)
    expect(newHitPoints.current).toBe(90)
  })

  it('should not be able to take damage if the damage is less than 0', () => {
    const hitPoints = new HitPoints(100, 100)
    expect(() => hitPoints.takeDamage(-1)).toThrow(DamageLessThanZeroError)
  })

  it('should return 0 hit points if the current hit points is 0 or less after taking damage', () => {
    const hitPoints = new HitPoints(0, 100)
    const newHitPoints = hitPoints.takeDamage(1)
    expect(newHitPoints.current).toBe(0)
  })

  it('should validate the hit points', () => {
    expect(() => new HitPoints(-1, 100)).toThrow(HitPointsLessThanZeroError)
    expect(() => new HitPoints(101, 100)).toThrow(
      HitPointsGreaterThanMaxHitPointsError,
    )
  })
})
