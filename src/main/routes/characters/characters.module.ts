import { Module } from '@nestjs/common'
import { CreateCharacterUseCase } from 'src/app/useCases/CreateCharacter'
import { prisma } from 'src/infra/prisma'
import { PrismaCharacterReadRepository } from 'src/infra/prisma/repositories/CharacterRead'
import { PrismaCharacterRepository } from 'src/infra/prisma/repositories/Character'
import { CreateCharacterRouteController } from './controllers/create-character.controller'
import { GetCharacterByIdRouteController } from './controllers/get-character-by-id.controller'

@Module({
  controllers: [
    CreateCharacterRouteController,
    GetCharacterByIdRouteController,
  ],
  providers: [
    {
      provide: CreateCharacterUseCase,
      useFactory: () => {
        const repository = new PrismaCharacterRepository(prisma)
        return new CreateCharacterUseCase(repository)
      },
    },
    {
      provide: 'CHARACTER_READ_REPOSITORY',
      useFactory: () => new PrismaCharacterReadRepository(prisma),
    },
  ],
})
export class CharactersModule {}
