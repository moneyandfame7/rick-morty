import React from "react";
import { render, screen } from "@testing-library/react";
import { CardList } from "./index";

jest.mock("../CharacterCard", () => ({
  CharacterCard: () => <div>test card</div>,
}));
// TODO: как это тестировать непанимаю я
describe("CardList", () => {
  let component: any;
  let cards: any;

  cards = [];

  it("should render properly", () => {
    givenComponent();
    thenItRendersProperly();
  });

  function givenComponent(props?: any) {
    component = render(<CardList items={cards} />);
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }
});
