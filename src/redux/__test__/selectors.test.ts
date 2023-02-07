import { getCharacters, getFavoritesAmount } from "../selectors";

describe("getCharacters", () => {
  it("should select favoriteCharacters from state object", () => {
    const favoriteCharacters: any = {
      characters: [{ name: "test", id: 228, status: "PIZDA" }],
    };
    const state: any = { favoriteCharacters };

    const characters = getCharacters(state);

    expect({ characters }).toEqual(favoriteCharacters);
  });
});

describe("getFavoritesAmount", () => {
  it("should return amount favorites correctly", () => {
    const favoriteCharacters: any = {
      characters: [
        { name: "test", id: 228, status: "PIZDA" },
        { name: "test2", status: "PIZDA" },
      ],
    };
    const state: any = { favoriteCharacters };

    const favoritesLength = getFavoritesAmount(state);

    expect(favoritesLength).toBe(2);
  });
});
