import { render, screen } from "@testing-library/react";
import { CharacterCard } from "./index";
import { useFetchEpisodeByIdQuery } from "../../redux/slices/rickMortyApiSlice";
import { IEpisode } from "../../interfaces";
import React from "react";

jest.mock("../../redux/slices/rickMortyApiSlice", () => ({
  useFetchEpisodeByIdQuery: jest.fn(),
}));

jest.mock("../../utils/getIdFromUrl", () => ({
  getIdFromName: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
}));

const data = {
  status: "Alive",
  name: "Test Name",
  image: "",
  location: {
    name: "location test",
    url: "url test",
  },
  episode: ["episode test1", "episode test2", "episode test3"],
  id: 1,
};

describe("CharacterCard", () => {
  let component: any;

  const mockEpisode = {
    name: "Test Name",
    episode: "Test Episode",
  };

  it("should render properly with default", () => {
    givenEpisode();
    givenComponent();
    thenItRendersProperly();
  });

  it("should render properly with Dead status", () => {
    givenEpisode();
    givenComponent({ status: "Dead" });
    thenItRendersProperly();
  });

  function givenComponent(props?: any) {
    component = render(<CharacterCard {...data} {...props} />);
  }

  function givenEpisode(data: Partial<IEpisode> = mockEpisode, isLoading: boolean = false) {
    (useFetchEpisodeByIdQuery as jest.Mock).mockImplementation(() => ({
      isLoading,
      data,
    }));
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }
});
