import React from 'react'
import { render, screen } from '@testing-library/react'

import { ErrorMessage } from 'shared/components'

describe('ErrorMessage', () => {
  let component: any

  const defaultError = {
    error: 'Default test error',
    status: 'Default test status'
  }

  const fetchError = {
    status: 'FETCH_ERROR',
    error: 'Fetch test error'
  }

  const serializedError = {
    name: 'Serialized test name',
    message: 'Serialized test message'
  }

  it('should render properly width FetchBaseQueryError other status', () => {
    givenComponent()
    thenItRendersProperly()
    defaultErrorRenderCorrectly()
  })

  it('should render properly width FetchBaseQueryError', () => {
    givenComponent(fetchError)
    fetchBaseQueryErrorRenderCorrectly(fetchError)
    thenItRendersProperly()
  })

  it('should render properly with SerializedError', () => {
    givenComponent(serializedError)
    serializedErrorRenderCorrectly(serializedError)
    thenItRendersProperly()
  })

  function givenComponent(error: any = defaultError) {
    component = render(<ErrorMessage error={error} />)
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot()
  }

  function serializedErrorRenderCorrectly(receivedError: any) {
    const errorMessage = screen.getByText(receivedError.message)
    expect(errorMessage).toBeInTheDocument()
  }

  function fetchBaseQueryErrorRenderCorrectly(receivedError: any) {
    const errorMessage = screen.getByText(receivedError.status)
    expect(errorMessage).toBeInTheDocument()
  }

  function defaultErrorRenderCorrectly() {
    const errorMessage = screen.getByText('Oops! Something went wrong.')
    expect(errorMessage).toBeInTheDocument()
  }
})
