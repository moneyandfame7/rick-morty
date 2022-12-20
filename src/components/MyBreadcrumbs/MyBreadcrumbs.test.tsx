import { render, screen } from "@testing-library/react";
import { MyBreadcrumbs } from "./index";
import { MemoryRouter } from "react-router";

// TODO: спросить как тут делать
describe("MyBreadcrumbs should render correctly", () => {
  let component: any;

  it("home route", () => {
    givenComponent();

    const label = screen.getByText("Home");

    expect(label).toBeInTheDocument();
    thenItRendersProperly();
  });

  it("unknown route", () => {
    givenComponent("/test/route/228");

    const label = screen.getByText("Information page");

    expect(label).toBeInTheDocument();
    thenItRendersProperly();
  });

  it("character route", () => {
    givenComponent("/character?page=1");

    const label = screen.getByText("Characters");

    expect(label).toBeInTheDocument();
    thenItRendersProperly();
  });

  it("should render correctly episode route", () => {
    givenComponent("/episode?page=1");

    const label = screen.getByText("Episodes");

    expect(label).toBeInTheDocument();
    thenItRendersProperly();
  });

  function givenComponent(route: string = "/") {
    component = render(
      <MemoryRouter initialEntries={[route]}>
        <MyBreadcrumbs />
      </MemoryRouter>
    );
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }
});
