import React from 'react'
import { render } from '@testing-library/react'
import { CardList } from 'features/characters/components'

// TODO: как это тестировать непанимаю я
describe('CardList', () => {
  let component: any

  it('should render properly', () => {
    givenComponent()
    thenItRendersProperly()
  })

  function givenComponent(props?: any) {
    component = render(<CardList items={[]} />)
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot()
  }
})
