export interface WeaponReadModel {
  id: string
  name: string
  damageDie: {
    quantity: number
    sides: number
  }
}
