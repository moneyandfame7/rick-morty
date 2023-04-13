import React, { type FC } from 'react'
import { Box, Grid } from '@mui/material'

import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'
import { AdminHeader, Wrapper, StatsBox, SkeletonTable, SkeletonChart } from 'features/admin/components'
import { useGetRecentUsersQuery, useGetUserStatisticsQuery } from 'features/admin/services'

import { RecentUsersTable } from './RecentUsersTable'
import { AuthorizationChart } from './AuthorizationChart'
import { VerifiedChart } from './VerifiedChart'

export const DashboardPage: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const { data: userStats } = useGetUserStatisticsQuery()
  const { data: recentUsers } = useGetRecentUsersQuery()
  return (
    <Wrapper>
      <Box component="main">
        <AdminHeader title={`Hi, ${user?.username}`} subtitle="Welcome back to the Rickmorty admin dashboard." />
        <Grid container spacing={3}>
          <StatsBox xs={12} sm={6} title="Authorization type">
            {userStats ? <AuthorizationChart userStats={userStats} /> : <SkeletonChart />}
          </StatsBox>
          <StatsBox xs={12} sm={6} title="Verified users">
            {userStats ? <VerifiedChart userStats={userStats} /> : <SkeletonChart />}
          </StatsBox>
          <StatsBox xs={12} title="Recent users">
            {recentUsers ? <RecentUsersTable recentUsers={recentUsers} /> : <SkeletonTable />}
          </StatsBox>
        </Grid>
      </Box>
    </Wrapper>
  )
}
