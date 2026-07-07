import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { z } from 'zod'

@Controller('weapons')
export class CreateWeaponRouteController {
  constructor(private readonly createWeaponUseCase: CreateWeaponUseCase) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: Body) {
    schema.parse(body)
    const id = await this.createWeaponUseCase.execute(body)

    return { id }
  }
}

interface Body {
  name: string
  damageDie: {
    quantity: number
    sides: number
  }
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  damageDie: z.object({
    quantity: z.number().int().min(1, 'Damage die quantity must be at least 1'),
    sides: z.number().int().min(1, 'Damage die sides must be at least 1'),
  }),
})
