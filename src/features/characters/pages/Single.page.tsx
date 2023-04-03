import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query'
import dayjs from 'dayjs'
import Image from 'mui-image'

import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material'

import { useAppDispatch, useAppSelector } from 'application/store'

import { selectIsFavorite, useGetOneCharacterQuery } from 'features/characters/services'

import { ErrorMessage } from 'shared/components'
import { CircularLoader } from 'shared/components/common'
import { PrimaryButton } from 'shared/components/common/buttons'
import { RedButton } from 'shared/components/common/buttons/RedButton'
import { NavigationEnum } from 'shared/constants'

import { useGetListOfEpisodesQuery } from 'features/episodes/services'
import { useToggleFavorite } from '../hooks'

export const SingleCharacterPage: FC = () => {
  const { id } = useParams()
  const theme = useTheme()
  const { data, isLoading, error } = useGetOneCharacterQuery(Number(id))
  const { data: episodeList } = useGetListOfEpisodesQuery(data?.episodes ?? skipToken)
  const isFavorite = useAppSelector(state => selectIsFavorite(state, data?.id))
  const { toggle } = useToggleFavorite(data)

  if (error) {
    return <ErrorMessage error={error} />
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          py: 4
        }}
      >
        <Stack direction="column" alignItems="center">
          <Stack direction="column" alignItems="center" gap={0.2} sx={{ pb: 1 }}>
            <Typography variant="body1" fontWeight={600} color="primary.lighter">
              Character
            </Typography>
            <Typography variant="h3" fontWeight={600} color="#fff" sx={{ mt: -1 }}>
              {data?.name}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-around" alignItems="flex-start" sx={{ pt: 2, userSelect: 'none' }}>
        <Box sx={{ width: '350px' }}>
          {data?.image && (
            <Stack direction="column" gap={2} alignItems="center">
              <Image
                src={data?.image}
                width="100%"
                duration={300}
                showLoading={<CircularLoader />}
                style={{ borderRadius: 8, minHeight: 300 }}
              />
              {isFavorite ? (
                <RedButton sx={{ height: '38px' }} onClick={toggle} fullWidth>
                  Remove from favorite
                </RedButton>
              ) : (
                <PrimaryButton onClick={toggle} fullWidth>
                  Add to favorite
                </PrimaryButton>
              )}
            </Stack>
          )}
          <Grid container spacing={1} sx={{ pt: 2 }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'primary.lighter' : 'primary.dark'}>
                <strong>Species:</strong> {data?.species}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'primary.lighter' : 'primary.dark'}>
                <strong>Gender:</strong> {data?.gender}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'primary.lighter' : 'primary.dark'}>
                <strong>Status:</strong> {data?.status}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'primary.lighter' : 'primary.dark'}>
                <strong>Created at:</strong> {dayjs(data?.createdAt).format('DD.MM.YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Stack direction="column" alignItems="center" gap={2} sx={{ pt: 2, maxHeight: 500 }}>
          <Typography variant="h4" fontWeight={600} sx={{ mt: -3 }}>
            Episodes list
          </Typography>
          <List
            sx={{
              backgroundColor: 'primary.dark',
              width: '300px',
              height: '100%',
              overflowY: 'scroll',
              borderRadius: '8px'
            }}
          >
            {episodeList?.map(episode => (
              <React.Fragment key={episode.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    disableTouchRipple
                    component={Link}
                    to={`/${NavigationEnum.EPISODES}/${episode.id}`}
                    sx={{ color: '#fff' }}
                  >
                    <ListItemText primary={episode.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Stack>
      </Stack>
    </>
  )
}
