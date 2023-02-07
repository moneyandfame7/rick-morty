import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { InfoAboutCharacterPage } from "./index";
import { useFetchCharacterByIdQuery } from "../../redux/slices/rickMortyApiSlice";
import { ICharacter } from "../../interfaces";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import userEvent from "@testing-library/user-event";
import { useAppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import React, { useState as useStateMock } from "react";

jest.mock("../../redux/slices/rickMortyApiSlice", () => ({
  useFetchCharacterByIdQuery: jest.fn(),
}));

jest.mock("../../redux/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("./index", () => ({
  ...jest.requireActual("./index"),
  handleOnFavoriteIconClick: jest.fn(),
}));

describe("InfoAboutCharacterPage", () => {
  let component: RenderResult;

  const mockData = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  };

  it("should render properly", () => {
    givenData();
    givenComponent();
    thenItRenderProperly();
  });

  it("should remove from favorites", () => {
    givenData();
    givenComponent();

    thenItRenderProperly();
  });
  // TODO: сделать чтобы можно было менять фаворит он или нет
  it("should add to favorite when click on button", async () => {
    givenData();
    givenComponent();

    const btn = await screen.findByTestId("btn-favorite");
    expect(btn).toHaveTextContent("Add to favorite");
    userEvent.click(btn);
    thenItRenderProperly();
  });

  function givenComponent() {
    component = render(<InfoAboutCharacterPage />);
  }

  function thenItRenderProperly() {
    expect(component).toMatchSnapshot();
  }
  function givenData(
    data: Partial<ICharacter> = mockData,
    isLoading: boolean = false,
    error: SerializedError | FetchBaseQueryError | undefined = undefined
  ) {
    (useFetchCharacterByIdQuery as jest.Mock).mockImplementation(() => ({
      isLoading,
      data,
      error,
    }));
  }
});
