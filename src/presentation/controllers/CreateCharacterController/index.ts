import {
  CreateCharacterInput,
  CreateCharacterUseCase,
} from 'src/app/useCases/CreateCharacter'
import { Character } from 'src/domain/entities/Character'
import { Validation } from 'src/presentation/validation'
import { Controller, HTTPStatusCode, Response } from '../.'

export class CreateCharacterController implements Controller {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCase,
    private readonly validation: Validation,
  ) {}

  async execute(createCharacterInput: CreateCharacterInput): Promise<Response> {
    this.validation.validate(createCharacterInput)
    const character =
      await this.createCharacterUseCase.execute(createCharacterInput)
    return {
      statusCode: HTTPStatusCode.CREATED,
      body: this.toCharacterResponse(character),
    }
  }

  private toCharacterResponse(character: Character) {
    return {
      id: character.id,
      name: character.name,
      hitPoints: {
        current: character.hitPoints.current,
        max: character.hitPoints.max,
      },
      isAlive: character.isAlive,
    }
  }
}
