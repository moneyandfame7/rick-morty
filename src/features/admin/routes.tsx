import React from 'react'
import { type RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ManagementPage } from './pages'
import { StatisticsPage } from './pages'
import { DashboardPage } from './pages'

const DASHBOARD_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <DashboardPage />,
  path: '/dashboard'
}

const MANAGEMENT_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <ManagementPage />,
  path: '/management'
}

const STATISTICS_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <StatisticsPage />,
  path: '/statistics'
}

export { DASHBOARD_ROUTE, MANAGEMENT_ROUTE, STATISTICS_ROUTE }
