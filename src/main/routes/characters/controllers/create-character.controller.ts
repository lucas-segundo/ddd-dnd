import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'

@Controller('characters')
export class CreateCharacterRouteController {
  constructor(
    private readonly createCharacterController: CreateCharacterController,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: Body) {
    const response = await this.createCharacterController.execute(body)
    return response.body
  }
}

interface Body {
  name: string
}
