import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { z } from 'zod'

@Controller('characters')
export class CreateCharacterRouteController {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: Body) {
    schema.parse(body)
    const id = await this.createCharacterUseCase.execute(body)

    return { id }
  }
}

interface Body {
  name: string
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
})
