import { Character } from '../entities/Character'

export interface CharacterRepository {
  create(character: Character): Promise<Character>
}
