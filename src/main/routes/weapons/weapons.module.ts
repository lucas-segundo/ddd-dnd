import { Module } from '@nestjs/common'
import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { WeaponRepository } from 'src/domain/entities/Weapon/repository'
import { prisma } from 'src/infra/prisma'
import { PrismaWeaponRepository } from 'src/infra/prisma/repositories/Weapon'
import { ZodValidation } from 'src/infra/zod'
import { CreateWeaponController } from 'src/presentation/controllers/CreateWeaponController'
import { Validation } from 'src/presentation/validation'
import { z } from 'zod'
import { WeaponsController } from './weapons.controller'

const createWeaponSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  damageDie: z.object({
    quantity: z.number().int().min(1, 'Damage die quantity must be at least 1'),
    sides: z.number().int().min(1, 'Damage die sides must be at least 1'),
  }),
})

export const WEAPON_REPOSITORY = 'WEAPON_REPOSITORY'
export const CREATE_WEAPON_VALIDATION = 'CREATE_WEAPON_VALIDATION'

@Module({
  controllers: [WeaponsController],
  providers: [
    {
      provide: WEAPON_REPOSITORY,
      useFactory: () => new PrismaWeaponRepository(prisma),
    },
    {
      provide: CreateWeaponUseCase,
      useFactory: (repository: WeaponRepository) =>
        new CreateWeaponUseCase(repository),
      inject: [WEAPON_REPOSITORY],
    },
    {
      provide: CREATE_WEAPON_VALIDATION,
      useFactory: () => new ZodValidation(createWeaponSchema),
    },
    {
      provide: CreateWeaponController,
      useFactory: (useCase: CreateWeaponUseCase, validation: Validation) =>
        new CreateWeaponController(useCase, validation),
      inject: [CreateWeaponUseCase, CREATE_WEAPON_VALIDATION],
    },
  ],
})
export class WeaponsModule {}
