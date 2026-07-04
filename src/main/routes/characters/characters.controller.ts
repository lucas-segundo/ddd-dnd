import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateCharacterInput } from 'src/app/useCases/CreateCharacter'
import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly createCharacterController: CreateCharacterController,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateCharacterInput) {
    const response = await this.createCharacterController.execute(body)
    return response.body
  }
}
