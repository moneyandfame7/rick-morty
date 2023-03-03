import charactersReducer, { addToFavorite, removeFromFavorite } from "../slices/characters.slice";
// TODO: показать потом
describe("characterSlice", () => {
  const characterOne = {
    name: "Test1",
    id: 1,
    status: "status1",
  };
  it("should return default state when passed an empty action", () => {
    const characters = charactersReducer(undefined, { type: "" });

    expect(characters).toEqual({ characters: {} });
  });

  it('should add new favorite character width "addToFavorite" action', () => {
    const state = { characters: [{ name: "Test0", id: 0, status: "status0" } as any] };
    const action = { type: addToFavorite.type, payload: characterOne };
    const favoriteCharacters = charactersReducer(state, action);

    expect(favoriteCharacters.characters[1]).toEqual(characterOne);
    expect(favoriteCharacters.characters[0]).not.toEqual(characterOne);
  });

  it('should remove character from favorite with "removeFromFavorite" action', () => {
    const state = {
      characters: [
        { name: "Test0", id: 0, status: "status0" } as any,
        { name: "Test1", id: 1, status: "status1" } as any,
      ],
    };
    const action = { type: removeFromFavorite.type, payload: 1 };

    const favoriteCharacters = charactersReducer(state, action);

    expect(favoriteCharacters.characters[0]).not.toEqual(characterOne);
    expect(favoriteCharacters).not.toEqual(state);
  });
});
