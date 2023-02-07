import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { Navigation } from "./index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useLocation: () => {
    return {
      pathname: "/character",
      search: "?page=1",
      hash: "",
      state: null,
      key: "default",
    };
  },
  useNavigate: () => mockedUsedNavigate,
}));

describe("Navigation", () => {
  let component: RenderResult;
  let defaultProps: any = {
    prev: null,
    next: "2",
    navigationType: "TEST",
    isLoading: false,
  };

  it("should render correctly", () => {
    givenComponent();

    thenItRendersProperly();
  });

  it("when click on button next, should called onClick with props", async () => {
    givenComponent();
    fireEvent.click(await screen.findByTestId("navigation-button-next-component"));

    expect(mockedUsedNavigate).toBeCalledWith(`/${defaultProps.navigationType}?page=${defaultProps.next}`);
    thenItRendersProperly();
  });

  it("when the previous page is null the button should be disabled and onClick don't called", async () => {
    // Arrange
    givenComponent();
    const btn = await screen.findByTestId("navigation-button-prev-component");
    // Act
    fireEvent.click(btn);
    // Assert
    expect(btn).toHaveClass("Mui-disabled");
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
    thenItRendersProperly();
  });

  function givenComponent() {
    component = render(<Navigation {...defaultProps} />);
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }
});
