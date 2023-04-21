import React, { type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/dist/query'

import { Avatar, Box, Container, Divider, Stack, Tooltip, Typography } from '@mui/material'
import Image from 'mui-image'

import { selectCurrentUser, useGetUserQuery } from 'features/users/services'
import { CircularLoader } from 'shared/components/common'
import { ACCOUNT_SETTINGS_ROUTE } from 'features/users/routes'
import { useAppSelector } from 'application/store'
import { OutlinedButton } from 'shared/components/common/buttons'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import countryList from 'react-select-country-list'
export const ProfilePage: FC = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetUserQuery(id ?? skipToken)
  const currentUser = useAppSelector(selectCurrentUser)
  if (!data && isLoading) {
    return <CircularLoader />
  }

  const getAvatar = () => {
    return data?.photo ? (
      <Image showLoading={false} duration={0} style={{ borderRadius: '50%' }} src={data.photo} alt={data.username} />
    ) : (
      <Avatar sx={{ width: '100%', height: 300 }} />
    )
  }

  const showAvatar = () => {
    if (currentUser?.id === data?.id) {
      return (
        <Tooltip arrow title="Change your avatar">
          <Box
            component={Link}
            width="100%"
            height={300}
            display="block"
            to={{ pathname: ACCOUNT_SETTINGS_ROUTE.path }}
          >
            {getAvatar()}
          </Box>
        </Tooltip>
      )
    }
    return getAvatar()
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box width={300}>
        {showAvatar()}

        <Typography sx={{ mt: 2 }} fontSize={20} color="text.secondary">
          {data?.username}
        </Typography>
        {data?.id === currentUser?.id && (
          <OutlinedButton fullWidth sx={{ my: 2 }}>
            Edit profile
          </OutlinedButton>
        )}
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" alignItems="center">
          <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
          {data?.country && <Typography fontSize={14}>{countryList().getLabel(data?.country)}</Typography>}
        </Stack>
      </Box>
    </Container>
  )
}
