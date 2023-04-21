import React, { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Stack, Typography, useTheme } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { LinkButton, OutlinedButton } from 'shared/components/common/buttons'
import { BaseIcon } from 'shared/components/common/icons'
import { HOME_ROUTE } from 'shared/routes'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { xs: '100%', sm: '450px' },
        p: { xs: 0 },
        mt: { xs: 7, sm: 10 },
        gap: 2
      }}
    >
      <BaseIcon icon={<InfoOutlinedIcon />} color={theme.palette.primary.main} />
      <Typography variant="h3" fontWeight={700}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign={'center'} sx={{ width: '80%' }}>
        The page you are looking for doesn&apos;t exist. Here are some helpful links:
      </Typography>
      <Stack direction="row" gap={3} flexWrap="wrap" alignItems="start">
        <OutlinedButton
          startIcon={<ArrowBackOutlinedIcon />}
          size="small"
          onClick={() => {
            navigate(-1)
          }}
        >
          Go back
        </OutlinedButton>
        <LinkButton to={HOME_ROUTE.path as string} variant="primary" size="small">
          Take me home
        </LinkButton>
      </Stack>
    </Container>
  )
}
