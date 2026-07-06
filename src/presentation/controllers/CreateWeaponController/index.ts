import {
  CreateWeaponInput,
  CreateWeaponUseCase,
} from 'src/app/useCases/CreateWeapon'
import { Validation } from 'src/presentation/validation'
import { Controller, HTTPStatusCode, Response } from '../.'

export class CreateWeaponController implements Controller {
  constructor(
    private readonly createWeaponUseCase: CreateWeaponUseCase,
    private readonly validation: Validation,
  ) {}

  async execute(createWeaponInput: CreateWeaponInput): Promise<Response> {
    this.validation.validate(createWeaponInput)
    const id = await this.createWeaponUseCase.execute(createWeaponInput)
    return {
      statusCode: HTTPStatusCode.CREATED,
      body: { id },
    }
  }
}
