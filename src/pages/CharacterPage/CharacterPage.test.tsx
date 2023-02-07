import { createElement } from "react";
import CharacterPage from "./CharacterPage";
import { render, screen } from "@testing-library/react";
import { ICharacter, IEpisode } from "../../interfaces";
import { useFetchCharactersQuery } from "../../redux/slices/rickMortyApiSlice";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => {
    return {
      pathname: "/character",
      search: "?page=1",
      hash: "",
      state: null,
      key: "default",
    };
  },
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/slices/rickMortyApiSlice", () => ({
  ...jest.requireActual("../../redux/slices/rickMortyApiSlice"),
  useFetchCharactersQuery: jest.fn(),
}));

describe("CharacterPage", () => {
  let component: any;
  const mockData: any = {
    info: {
      prev: null,
    },
    results: [{ name: "TEST CHARACTER NAME", episode: ["1", "2", "3"] }],
  };
  // TODO: пофиксить эту залупу ебучую
  it("should render properly", () => {
    givenData();
    givenComponent();

    thenItRenderProperly();
  });

  it("should display characters correctly", () => {
    givenData();
    givenComponent();

    const character = screen.getByText("TEST CHARACTER NAME");

    expect(character).toBeInTheDocument();
    thenItRenderProperly();
  });
  function givenComponent() {
    component = render(
      <Provider store={store}>
        <CharacterPage />
      </Provider>
    );
  }

  function thenItRenderProperly() {
    expect(component).toMatchSnapshot();
  }

  function givenData(
    data: Partial<ICharacter> = mockData,
    isLoading: boolean = false,
    isError: boolean = false,
    error: FetchBaseQueryError | SerializedError | undefined = undefined
  ) {
    (useFetchCharactersQuery as jest.Mock).mockImplementation(() => ({
      isLoading,
      data,
      isError,
      error,
    }));
  }
});
