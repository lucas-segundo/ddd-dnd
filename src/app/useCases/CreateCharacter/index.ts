import { randomUUID } from 'crypto'
import { Character } from 'src/domain/entities/Character'
import { CharacterRepository } from 'src/domain/entities/Character/repository'
import { Equipament } from 'src/domain/valueObjects/Equipament'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'

export class CreateCharacterUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: CreateCharacterInput): Promise<Character> {
    const character = new Character(
      randomUUID(),
      input.name,
      new HitPoints(100, 100),
      new Equipament(null),
      true,
    )

    return this.characterRepository.create(character)
  }
}

export interface CreateCharacterInput {
  name: string
}
