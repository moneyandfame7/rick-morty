import React from 'react'
import { render, screen } from '@testing-library/react'
import { CharacterCard } from './index'
import userEvent from '@testing-library/user-event'
import { useGetOneEpisodeQuery } from '../../features/episodes/services/api.slice'
import { IEpisode } from '../../features/episodes/type'

const mockNavigate = jest.fn()

jest.mock('../../redux/slices/rickMortyApiSlice', () => ({
  useGetOneEpisodeQuery: jest.fn()
}))

jest.mock('../../utils/getIdFromUrl', () => ({
  getIdFromName: jest.fn()
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}))

describe('CharacterCard', () => {
  let component: any

  const mockEpisode = {
    name: 'TEST_EPISODE_NAME',
    episode: 'TEST_EPISODE_EPISODE'
  }
  const data = {
    status: 'Alive',
    name: 'Test Name',
    image: '',
    location: {
      name: 'location test',
      url: 'url test'
    },
    episode: ['episode test1', 'episode test2', 'episode test3'],
    id: 10
  }

  it('should render properly with default', () => {
    givenEpisode()
    givenComponent()
    thenItRendersProperly()
  })

  it('should render properly with Dead status', () => {
    givenEpisode()
    givenComponent({ status: 'Dead' })
    thenItRendersProperly()
  })

  it('should navigate to character page when click on button', async () => {
    givenEpisode()
    givenComponent()
    const btn = screen.getByTestId('card-button-component')

    expect(btn).toBeInTheDocument()
    userEvent.click(btn)

    expect(mockNavigate).toHaveBeenCalledWith(`/character/${data.id}`)
  })

  it('when loading, the loader should be displayed', () => {
    givenEpisode(mockEpisode, true)
    givenComponent()

    const loader = screen.getByTestId('card-loader-component')
    const episodeText1 = screen.queryByText('TEST_EPISODE_NAME')
    const episodeText2 = screen.queryByText('TEST_EPISODE_EPISODE')

    expect(loader).toBeInTheDocument()
    expect(episodeText1 && episodeText2).not.toBeInTheDocument()
    thenItRendersProperly()
  })
  function givenComponent(props?: any) {
    component = render(<CharacterCard {...data} {...props} />)
  }

  function givenEpisode(data: Partial<IEpisode> = mockEpisode, isLoading: boolean = false) {
    ;(useGetOneEpisodeQuery as jest.Mock).mockImplementation(() => ({
      isLoading,
      data
    }))
  }

  function thenItRendersProperly() {
    expect(component).toMatchSnapshot()
  }
})
