import React from 'react'
import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { CreateCharacterPage, MainCharacterPage, SingleCharacterPage } from 'features/characters/pages'

const MAIN_CHARACTER_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <MainCharacterPage />,
  path: '/characters'
}

const SINGLE_CHARACTER_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SingleCharacterPage />,
  path: '/characters/:id'
}

const CREATE_CHARACTER_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <CreateCharacterPage />,
  path: '/create-character'
}

export { CREATE_CHARACTER_ROUTE, MAIN_CHARACTER_ROUTE, SINGLE_CHARACTER_ROUTE }
