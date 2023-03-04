import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ColorModeContext } from 'application'

import { ToggleMode } from 'shared/components'

describe('ToggleMode', () => {
  let component: any
  const mockToggleColorMode = jest.fn()

  it('should render properly', () => {
    givenComponent()

    thenItRendersProperly()
  })

  it('should change theme when click on toggle', async () => {
    givenComponent()

    const btn = screen.getByTestId('theme-button')
    userEvent.click(btn)

    const darkIcon = await screen.findByTestId('DarkModeIcon')
    userEvent.click(darkIcon)

    expect(mockToggleColorMode).toHaveBeenCalledTimes(2)

    thenItRendersProperly()
  })

  function givenComponent(props?: any) {
    component = render(
      <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode }}>
        <ToggleMode />
      </ColorModeContext.Provider>
    )
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot()
  }
})
