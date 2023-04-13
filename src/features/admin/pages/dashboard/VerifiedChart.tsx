import React, { type FC } from 'react'
import { blue } from '@mui/material/colors'

import { StatisticsChart } from '@features/admin/components/StatisticsChart'
import { ChartProps } from './AuthorizationChart'

export const VerifiedChart: FC<ChartProps> = ({ userStats }) => {
  const colors = [blue[500], blue[800], blue[700], blue[600], blue[400], blue[300]]

  const totalVerified = userStats.verifiedStats.reduce((sum, { count }) => sum + parseInt(count), 0)

  const formattedData = userStats.verifiedStats.map((stat, index) => ({
    id: stat.verified ? 'Verified' : 'Unverified',
    label: stat.verified ? 'Verified' : 'Unverified',
    value: parseInt(stat.count),
    color: colors[index],
    percentage: ((parseInt(stat.count) / totalVerified) * 100).toFixed(1) + '%'
  }))
  return <StatisticsChart data={formattedData} lined={['Verified']} enableLabels labelColor="#fff" />
}
