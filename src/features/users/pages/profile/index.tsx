import React, { useEffect, type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import countryList from 'react-select-country-list'

import { Avatar, Box, Container, Divider, Stack, Tooltip, Typography } from '@mui/material'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import Image from 'mui-image'

import { useAppSelector } from 'application/store'

import { selectCurrentUser, useLazyGetUserQuery } from 'features/users/services'

import { CircularLoader } from 'shared/components/common'
import { EditSettings } from './EditSettings'

export const ProfilePage: FC = () => {
  const { id } = useParams()
  const [get, { data, isLoading }] = useLazyGetUserQuery()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    ;(async () => {
      if (id) {
        await get(id)
      }
    })()
  }, [id])
  if ((!data && isLoading) || !id) {
    return <CircularLoader />
  }

  const getAvatar = () => {
    return <Avatar src={data?.photo} sx={{ width: '100%', height: 300 }} />
  }

  const showAvatar = () => {
    if (currentUser?.id === data?.id) {
      return (
        <Tooltip arrow title="Change your avatar">
          <Box component={Link} width="100%" height={300} display="block" to="/settings/profile">
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
        {data?.id === currentUser?.id && <EditSettings getUser={get} userId={id} />}

        <Divider sx={{ my: 3 }} />

        <Stack gap={1}>
          {data?.country && (
            <Stack direction="row" alignItems="center" gap={1}>
              <PlaceOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography fontSize={14}>{countryList().getLabel(data?.country)}</Typography>
            </Stack>
          )}
          {data?.mail_subscribe && (
            <Stack direction="row" alignItems="center" gap={1}>
              <MailOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography fontSize={14}>Subscribed to the mail</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Container>
  )
}
