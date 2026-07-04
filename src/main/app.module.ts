import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { GlobalExceptionFilter } from 'src/main/filters/GlobalExceptionFilter'
import { CharactersModule } from 'src/main/routes/characters/characters.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CharactersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
