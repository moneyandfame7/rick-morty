import { EpisodeList } from "./index";
import { act, render, RenderResult } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { makeConcurrentRequest } from "../../utils/fetch";

jest.mock("../../utils/fetch", () => ({
  makeConcurrentRequest: jest.fn(),
}));

// TODO: как нибудь разобраться
describe("EpisodeList", () => {
  const mockEpisode: any = {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/2",
      "https://rickandmortyapi.com/api/character/35",
      "https://rickandmortyapi.com/api/character/38",
      "https://rickandmortyapi.com/api/character/62",
      "https://rickandmortyapi.com/api/character/92",
      "https://rickandmortyapi.com/api/character/127",
      "https://rickandmortyapi.com/api/character/144",
      "https://rickandmortyapi.com/api/character/158",
      "https://rickandmortyapi.com/api/character/175",
      "https://rickandmortyapi.com/api/character/179",
      "https://rickandmortyapi.com/api/character/181",
      "https://rickandmortyapi.com/api/character/239",
      "https://rickandmortyapi.com/api/character/249",
      "https://rickandmortyapi.com/api/character/271",
      "https://rickandmortyapi.com/api/character/338",
      "https://rickandmortyapi.com/api/character/394",
      "https://rickandmortyapi.com/api/character/395",
      "https://rickandmortyapi.com/api/character/435",
    ],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z",
  };
  let component: RenderResult;
  (makeConcurrentRequest as jest.Mock).mockReturnValue([mockEpisode]);
  const setStateMock = jest.fn();
  const useStateMock: any = (useState: any) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  it("should render properly", () => {
    givenComponent();

    thenItRendersProperly();
  });

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }

  function givenComponent(props?: any) {
    component = render(<EpisodeList episodes={["1", "2", "3", "4"]} />);
  }
});
