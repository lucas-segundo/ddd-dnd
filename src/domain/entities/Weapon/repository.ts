import { Weapon } from '.'

export interface WeaponRepository {
  create(weapon: Weapon): Promise<Weapon>
}
