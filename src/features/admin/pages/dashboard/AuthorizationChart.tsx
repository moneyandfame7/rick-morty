import { purple } from '@mui/material/colors'
import { StatisticsChart } from 'features/admin/components/StatisticsChart'
import { UserStatistics } from 'features/admin/type'
import React, { type FC } from 'react'

export interface ChartProps {
  userStats: UserStatistics
}
export const AuthorizationChart: FC<ChartProps> = ({ userStats }) => {
  const colors1 = [purple[500], purple[800], purple[700], purple[600], purple[400], purple[300]]
  const total = userStats.authStats.reduce((sum, { count }) => sum + parseInt(count), 0)

  const formattedData = userStats.authStats.map((stat, index) => ({
    id: stat.auth_type,
    label: stat.auth_type,
    value: parseInt(stat.count),
    color: colors1[index],
    percentage: ((parseInt(stat.count) / total) * 100).toFixed(1) + '%'
  }))

  return <StatisticsChart data={formattedData} lined={['jwt']} count={userStats.userCount} />
}
