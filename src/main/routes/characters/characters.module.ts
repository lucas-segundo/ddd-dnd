import { Module } from '@nestjs/common'
import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { CharacterRepository } from 'src/domain/entities/Character/repository'
import { prisma } from 'src/infra/prisma'
import { PrismaCharacterRepository } from 'src/infra/prisma/repositories/Character'
import { ZodValidation } from 'src/infra/zod'
import { CreateCharacterController } from 'src/presentation/controllers/CreateCharacterController'
import { Validation } from 'src/presentation/validation'
import { z } from 'zod'
import { CharactersController } from './characters.controller'

const createCharacterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export const CHARACTER_REPOSITORY = 'CHARACTER_REPOSITORY'
export const CREATE_CHARACTER_VALIDATION = 'CREATE_CHARACTER_VALIDATION'

@Module({
  controllers: [CharactersController],
  providers: [
    {
      provide: CHARACTER_REPOSITORY,
      useFactory: () => new PrismaCharacterRepository(prisma),
    },
    {
      provide: CreateCharacterUseCase,
      useFactory: (repository: CharacterRepository) =>
        new CreateCharacterUseCase(repository),
      inject: [CHARACTER_REPOSITORY],
    },
    {
      provide: CREATE_CHARACTER_VALIDATION,
      useFactory: () => new ZodValidation(createCharacterSchema),
    },
    {
      provide: CreateCharacterController,
      useFactory: (useCase: CreateCharacterUseCase, validation: Validation) =>
        new CreateCharacterController(useCase, validation),
      inject: [CreateCharacterUseCase, CREATE_CHARACTER_VALIDATION],
    },
  ],
})
export class CharactersModule {}
