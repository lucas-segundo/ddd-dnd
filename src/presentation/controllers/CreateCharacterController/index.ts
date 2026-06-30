import {
  CreateCharacterInput,
  CreateCharacterUseCase,
} from 'src/app/useCases/CreateCharacter'
import { Validation } from 'src/presentation/validation'
import { Controller, ErrorResponse, Response } from '../.'
import { HTTPValidationError } from 'src/presentation/errors/HTTPValidationError'

export class CreateCharacterController implements Controller {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCase,
    private readonly validation: Validation,
  ) {}

  async execute(
    createCharacterInput: CreateCharacterInput,
  ): Promise<Response | ErrorResponse> {
    try {
      return await this.handleSuccess(createCharacterInput)
    } catch (error) {
      return this.handleError(error)
    }
  }

  private async handleSuccess(createCharacterInput: CreateCharacterInput) {
    this.validation.validate(createCharacterInput)
    const character =
      await this.createCharacterUseCase.execute(createCharacterInput)
    return {
      statusCode: 201,
      body: character,
    }
  }

  private handleError(error: unknown) {
    if (error instanceof HTTPValidationError) {
      return {
        code: error.code,
        body: error.body,
        statusCode: error.statusCode,
      }
    }

    return {
      code: 'INTERNAL_SERVER_ERROR',
      body: {
        message: 'Internal server error',
      },
      statusCode: 500,
    }
  }
}
