import React, { type FC } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Box, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'

import { LinkButton } from 'shared/components/common/buttons'

export const Header: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  return (
    <Stack
      component="header"
      gap={2}
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'left', md: 'center' }
      }}
      mt={1}
      px={1}
      mb={5}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar src={currentUser?.photo} />
        <Box>
          <Typography
            component={Link}
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 600,
              fontSize: 20,
              ':hover': {
                textDecoration: 'underline'
              }
            }}
            to={{ pathname: `/profile/${currentUser?.id}` }}
          >
            {currentUser?.username}
          </Typography>
          <Typography color="text.secondary" fontSize={13} fontWeight={500} lineHeight={1}>
            Your personal account
          </Typography>
        </Box>
      </Stack>
      <LinkButton
        sx={{ width: 'max-content' }}
        variant="outlined"
        to={{ pathname: `/profile/${currentUser?.id}` }}
        size="small"
      >
        Go to your personal profile
      </LinkButton>
    </Stack>
  )
}
