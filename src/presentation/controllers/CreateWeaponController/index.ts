import {
  CreateWeaponInput,
  CreateWeaponUseCase,
} from 'src/app/useCases/CreateWeapon'
import { Weapon } from 'src/domain/entities/Weapon'
import { Validation } from 'src/presentation/validation'
import { Controller, HTTPStatusCode, Response } from '../.'

export class CreateWeaponController implements Controller {
  constructor(
    private readonly createWeaponUseCase: CreateWeaponUseCase,
    private readonly validation: Validation,
  ) {}

  async execute(createWeaponInput: CreateWeaponInput): Promise<Response> {
    this.validation.validate(createWeaponInput)
    const weapon = await this.createWeaponUseCase.execute(createWeaponInput)
    return {
      statusCode: HTTPStatusCode.CREATED,
      body: this.toWeaponResponse(weapon),
    }
  }

  private toWeaponResponse(weapon: Weapon) {
    return {
      id: weapon.id,
      name: weapon.name,
      damageDie: {
        quantity: weapon.damageDie.quantity,
        sides: weapon.damageDie.sides,
      },
    }
  }
}
