import { Character } from '.'

export interface CharacterRepository {
  create(character: Character): Promise<Character>
}
