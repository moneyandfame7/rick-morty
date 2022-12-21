import { render, screen } from "@testing-library/react";
import { MyBreadcrumbs } from "./index";
import React from "react";
import { MemoryRouter } from "react-router";
let mockArchitectureBreadcrumbs = [
  {
    id: 0,
    label: "Home",
    path: "/",
    isActive: false,
  },
];

jest.mock("../../utils/useMakeArchitectureBreadcrumbs/useMakeArchitectureBreadcrumbs", () => ({
  useMakeArchitectureBreadcrumbs: () => mockArchitectureBreadcrumbs,
}));

let mockLocationValue = {
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "default",
};
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useLocation: () => mockLocationValue,
}));
// TODO: спросить как тут делать
describe("MyBreadcrumbs should render correctly", () => {
  let component: any;

  it("should render correctly", () => {
    givenComponent();

    thenItRendersProperly();
  });

  it('should only display the "home" label on the main page', () => {
    givenComponent();
    mockLocationValue = {
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: "default",
    };

    const homeLabel = screen.getByText("Home");
    const characterLabel = screen.queryByText("Character");

    expect(homeLabel).toBeInTheDocument();
    expect(characterLabel).not.toBeInTheDocument();
    thenItRendersProperly();
  });

  it("should correctly display labels on character page", () => {
    mockLocationValue = {
      pathname: "/character",
      search: "?page=1",
      hash: "",
      state: null,
      key: "qxf897bc",
    };
    mockArchitectureBreadcrumbs = [
      {
        id: 0,
        label: "Home",
        path: "/",
        isActive: false,
      },
      {
        id: 1,
        label: "Characters",
        path: "/character?page=1",
        isActive: true,
      },
    ];
    givenComponent();

    const homeLabel = screen.getByText("Home");
    const characterLabel = screen.getByText("Characters");

    expect(homeLabel && characterLabel).toBeInTheDocument();
    thenItRendersProperly();
  });

  it("should correctly display labels for character-info page", () => {
    mockLocationValue = {
      pathname: "/character/1",
      search: "",
      hash: "",
      state: null,
      key: "d3gp67cq",
    };
    mockArchitectureBreadcrumbs = [
      {
        id: 0,
        label: "Home",
        path: "/",
        isActive: false,
      },
      {
        id: 1,
        label: "Characters",
        path: "/character?page=1",
        isActive: false,
      },
      {
        id: 2,
        label: "Information page",
        path: "/character/1",
        isActive: true,
      },
    ];

    givenComponent();

    const homeLabel = screen.getByText("Home");
    const characterLabel = screen.getByText("Characters");
    const infoLabel = screen.getByText("Information page");

    expect(homeLabel && characterLabel && infoLabel).toBeInTheDocument();
  });

  it("when the route is unknown, should not display others label", () => {
    mockLocationValue = {
      pathname: "/unknown/123123/5432167/12379/sdfgsdfg",
      search: "",
      hash: "",
      state: null,
      key: "d3gp67cq",
    };
    mockArchitectureBreadcrumbs = [
      {
        id: 0,
        label: "Home",
        path: "/",
        isActive: false,
      },
      {
        id: 1,
        label: "Information page",
        path: "/unknown/123123/5432167/12379/sdfgsdfg",
        isActive: false,
      },
    ];
    givenComponent();

    const unknownLabel = screen.queryByText("unknown");
    const infoLabel = screen.getByText("Information page");

    expect(unknownLabel).toBeFalsy();
    expect(unknownLabel).not.toBeInTheDocument();
    expect(infoLabel).toBeInTheDocument();

    thenItRendersProperly();
  });

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }

  function givenComponent() {
    component = render(
      <MemoryRouter initialEntries={["/"]}>
        <MyBreadcrumbs />
      </MemoryRouter>
    );
  }
});
