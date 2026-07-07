import { WeaponReadModel } from './Weapon'

export interface CharacterReadModel {
  id: string
  name: string
  hitPoints: number
  maxHitPoints: number
  isAlive: boolean
  mainHand?: WeaponReadModel | null
}
