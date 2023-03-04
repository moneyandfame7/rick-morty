import { render, screen } from '@testing-library/react'
import { NotFoundPage } from 'shared/pages'

let mockLocationValue = {
  pathname: '/cbads/sdfb/43',
  search: '',
  hash: '',
  state: null,
  key: 'default'
}
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useLocation: () => mockLocationValue,
  useNavigate: () => jest.fn()
}))

describe('NotFoundPage', () => {
  let component: any
  it('should render properly', () => {
    givenComponent()

    thenItRenderProperly()
  })

  it('should render correctly pathname in button', () => {
    givenComponent()
    const btn = screen.getByTestId('button-link')

    expect(btn).toHaveTextContent(mockLocationValue.pathname)

    thenItRenderProperly()
  })
  function givenComponent() {
    component = render(<NotFoundPage />)
  }

  function thenItRenderProperly() {
    expect(component).toMatchSnapshot()
  }
})
