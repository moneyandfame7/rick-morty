import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { Modal } from "./index";
import React from "react";

describe("Modal", () => {
  let component: RenderResult;
  const defaultProps = {
    open: true,
    title: "Test title",
    message: "Test message",
    onClose: jest.fn(),
  };

  it("should render correctly with default", () => {
    // Arrange
    givenComponent();

    // Assert
    thenItRendersProperly();
  });

  it("should render correctly with another props", () => {
    //Arrange
    const title = "Secondary test props";
    givenComponent({ title });
    //Act
    const text = screen.getByText(title);
    //Assert
    expect(text).toBeInTheDocument();
    thenItRendersProperly();
  });

  it("when click on button, should call onClick", async () => {
    // Arrange
    givenComponent();
    // Act
    fireEvent.click(await screen.findByTestId("modal-button-component"));
    // Assert
    expect(defaultProps.onClose).toBeCalled();
  });

  function givenComponent(props?: any) {
    component = render(<Modal {...defaultProps} {...props} />);
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot();
  }
});
