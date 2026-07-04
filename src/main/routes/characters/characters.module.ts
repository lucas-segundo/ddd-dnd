import { Module } from '@nestjs/common'
import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { prisma } from 'src/infra/prisma'
import { PrismaCharacterRepository } from 'src/infra/prisma/repositories/Character'
import { ZodValidation } from 'src/infra/zod'
import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'
import { z } from 'zod'
import { CharactersController } from './characters.controller'

const createCharacterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

@Module({
  controllers: [CharactersController],
  providers: [
    {
      provide: CreateCharacterUseCase,
      useFactory: () => {
        const repository = new PrismaCharacterRepository(prisma)
        const useCase = new CreateCharacterUseCase(repository)
        const validation = new ZodValidation(createCharacterSchema)
        return new CreateCharacterController(useCase, validation)
      },
    },
  ],
})
export class CharactersModule {}
