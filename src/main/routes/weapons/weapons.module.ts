import { Module } from '@nestjs/common'
import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { prisma } from 'src/infra/prisma'
import { PrismaWeaponRepository } from 'src/infra/prisma/repositories/Weapon'
import { ZodValidation } from 'src/infra/zod'
import { CreateWeaponController } from 'src/presentation/controllers/CreateWeaponController'
import { z } from 'zod'
import { WeaponsController } from './weapons.controller'

const createWeaponSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  damageDie: z.object({
    quantity: z.number().int().min(1, 'Damage die quantity must be at least 1'),
    sides: z.number().int().min(1, 'Damage die sides must be at least 1'),
  }),
})

@Module({
  controllers: [WeaponsController],
  providers: [
    {
      provide: CreateWeaponController,
      useFactory: () => {
        const repository = new PrismaWeaponRepository(prisma)
        const useCase = new CreateWeaponUseCase(repository)
        const validation = new ZodValidation(createWeaponSchema)
        return new CreateWeaponController(useCase, validation)
      },
    },
  ],
})
export class WeaponsModule {}
