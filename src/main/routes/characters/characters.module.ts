import { Module } from '@nestjs/common'
import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { prisma } from 'src/infra/prisma'
import { PrismaCharacterReadRepository } from 'src/infra/prisma/repositories/CharacterRead'
import { PrismaCharacterRepository } from 'src/infra/prisma/repositories/Character'
import { ZodValidation } from 'src/infra/zod'
import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'
import { z } from 'zod'
import { CreateCharacterRouteController } from './controllers/create-character.controller'
import { GetCharacterByIdRouteController } from './controllers/get-character-by-id.controller'

const createCharacterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

@Module({
  controllers: [
    CreateCharacterRouteController,
    GetCharacterByIdRouteController,
  ],
  providers: [
    {
      provide: CreateCharacterController,
      useFactory: () => {
        const repository = new PrismaCharacterRepository(prisma)
        const useCase = new CreateCharacterUseCase(repository)
        const validation = new ZodValidation(createCharacterSchema)
        return new CreateCharacterController(useCase, validation)
      },
    },
    {
      provide: 'CHARACTER_READ_REPOSITORY',
      useFactory: () => new PrismaCharacterReadRepository(prisma),
    },
  ],
})
export class CharactersModule {}
