import React, { FC, useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material'
import { grey } from '@mui/material/colors'
import InfoIcon from '@mui/icons-material/Info'
import { useAppSelector } from 'application/store'
import { selectCurrentUser } from 'features/users/services'

import { useWelcome } from 'features/authorization/hooks'
import { useNavigate } from 'react-router'
import { selectHasPassedWelcome } from 'features/authorization/services'
import { HOME_ROUTE } from 'shared/routes'
import { ValidatedInput } from 'shared/components/ValidatedInput'
import { SelectInput } from 'shared/components/SelectInput'

export const WelcomePage: FC = () => {
  const navigate = useNavigate()
  const { countries, formik, isLoading } = useWelcome()
  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome)
  if (hasPassedWelcome) {
    navigate({ pathname: HOME_ROUTE.path })
  }
  return (
    <React.Fragment>
      <Container
        component='main'
        maxWidth='xs'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}
      >
        <Typography variant='h4' fontSize={25} fontWeight={400} textAlign='center'>
          Welcome to the website based on the TV show Rick and Morty
        </Typography>
        <Typography variant='caption' textAlign='center' color={grey[600]} m='10px 0 20px'>
          Just a few questions to provide you with the best possible experience:
        </Typography>
      </Container>
      <Container component='form' onSubmit={formik.handleSubmit} noValidate maxWidth='sm'>
        <Grid container spacing={2}>
          <Grid item xs={12} display='flex' alignItems='center'>
            <ValidatedInput
              size='small'
              name='username'
              label='Username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.username}
              errorText={formik.errors.username}
            />
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title='Your username will be public for everyone'
              arrow
            >
              <InfoIcon sx={{ cursor: 'help', ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
          <Grid item xs={12} display='flex' alignItems='center'>
            <Box display='flex' alignItems='center' gap={1} width='100%'>
              <Typography variant='body2' fontWeight={500}>
                Which country do you reside in?
              </Typography>
              <SelectInput
                name='country'
                items={countries}
                fullWidth
                touched={formik.touched.country}
                onChange={formik.handleChange}
                value={formik.values.country}
                onBlur={formik.handleBlur}
                errorText={formik.errors.country}
                defaultValue={countries.find(country => country === 'Ukraine')}
              />
            </Box>

            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title="We need to make sure that you don't choose a fucking russia"
              arrow
            >
              <InfoIcon sx={{ cursor: 'help', ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
          <Grid item xs={12} display='flex' alignItems='center'>
            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1} width='100%'>
              <Checkbox
                id='mail_subscribe'
                name='mail_subscribe'
                checked={formik.values.mail_subscribe}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography variant='body2' fontWeight={500}>
                Subscribe to the newsletter?
              </Typography>
            </Box>

            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title=' We can email you updates on new features.'
              arrow
            >
              <InfoIcon sx={{ cursor: 'help', ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
        </Grid>
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Get started
        </Button>
      </Container>
    </React.Fragment>
  )
}
