import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateWeaponInput } from 'src/app/useCases/CreateWeapon'
import { CreateWeaponController } from 'src/presentation/controllers/CreateWeaponController'

@Controller('weapons')
export class WeaponsController {
  constructor(
    private readonly createWeaponController: CreateWeaponController,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateWeaponInput) {
    const response = await this.createWeaponController.execute(body)
    return response.body
  }
}
