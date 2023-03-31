import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Stack, Typography } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { OutlinedButton } from '../components/common/buttons/OutlinedButton'
import { LinkButton } from '../components/common/buttons/LinkButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { PrimaryIcon } from '../components/common/icons/PrimaryIcon'
import { HOME_ROUTE } from '../routes'

export const NotFoundPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
      <PrimaryIcon icon={<InfoOutlinedIcon />} />
      <Typography variant="h3" fontWeight={700}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign={'center'} sx={{ width: '80%' }}>
        The page you are looking for doesn't exist. Here are some helpful links:
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
