import { mockCharacterRepository } from 'src/domain/entities/Character/repository.mock'
import { CreateCharacterUseCase } from '.'
import { Character } from 'src/domain/entities/Character'
import { HitPoints } from 'src/domain/valueObjects/HitPoints'
import { Equipament } from 'src/domain/valueObjects/Equipament'

describe('CreateCharacterUseCase', () => {
  it('should be able to create a character', async () => {
    const characterRepository = mockCharacterRepository()
    characterRepository.create.mockResolvedValue(
      new Character(
        '1',
        'John Doe',
        new HitPoints(100, 100),
        new Equipament(null),
        true,
      ),
    )

    const createCharacterUseCase = new CreateCharacterUseCase(
      characterRepository,
    )
    const character = await createCharacterUseCase.execute({ name: 'John Doe' })
    expect(character.name).toBe('John Doe')
  })
})
