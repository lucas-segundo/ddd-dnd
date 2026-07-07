import { Module } from '@nestjs/common'
import { CreateWeaponUseCase } from 'src/app/useCases/CreateWeapon'
import { prisma } from 'src/infra/prisma'
import { PrismaWeaponRepository } from 'src/infra/prisma/repositories/Weapon'
import { CreateWeaponRouteController } from './controllers/create-weapon.controller'

@Module({
  controllers: [CreateWeaponRouteController],
  providers: [
    {
      provide: CreateWeaponUseCase,
      useFactory: () => {
        const repository = new PrismaWeaponRepository(prisma)
        return new CreateWeaponUseCase(repository)
      },
    },
  ],
})
export class WeaponsModule {}
