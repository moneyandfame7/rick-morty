import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { CreateEpisodePage, MainEpisodePage, SingleEpisodePage } from 'features/episodes/pages'

const MAIN_EPISODE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <MainEpisodePage />,
  path: '/episodes'
}

const SINGLE_EPISODE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SingleEpisodePage />,
  path: '/episodes/:id'
}

const CREATE_EPISODE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <CreateEpisodePage />,
  path: '/create-episode'
}

export { MAIN_EPISODE_ROUTE, SINGLE_EPISODE_ROUTE, CREATE_EPISODE_ROUTE }
