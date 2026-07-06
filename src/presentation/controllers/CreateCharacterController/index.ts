import {
  CreateCharacterInput,
  CreateCharacterUseCase,
} from 'src/app/useCases/CreateCharacter'
import { Validation } from 'src/presentation/validation'
import { Controller, HTTPStatusCode, Response } from '../.'

export class CreateCharacterController implements Controller {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCase,
    private readonly validation: Validation,
  ) {}

  async execute(createCharacterInput: CreateCharacterInput): Promise<Response> {
    this.validation.validate(createCharacterInput)
    const id = await this.createCharacterUseCase.execute(createCharacterInput)
    return {
      statusCode: HTTPStatusCode.CREATED,
      body: { id },
    }
  }
}
