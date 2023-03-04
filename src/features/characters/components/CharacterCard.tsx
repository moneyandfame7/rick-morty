import React, { FC } from 'react'
import { green, grey, red } from '@mui/material/colors'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetOneEpisodeQuery } from 'features/episodes/services'
import type { CharacterLocation } from 'features/characters/type'
import { NavigationEnum } from 'shared/constants'

interface ICharacterCardProps {
  status: string
  name: string
  image: string
  location: CharacterLocation
  episodes: number[]
  id: number
}

export const CharacterCard: FC<ICharacterCardProps> = ({ status, name, image, location, episodes, id }) => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetOneEpisodeQuery(episodes[0])
  const textColor = () => {
    switch (true) {
      case status.includes('Dead'):
        return { color: red[600] }
      case status.includes('Alive'):
        return { color: green[600] }
      default:
        return { color: grey[400] }
    }
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%' }}>
        <CardMedia component='img' alt='green iguana' image={image} width='200px' />
        <CardHeader
          sx={{ minHeight: '100px', padding: 1 }}
          title={name}
          subheader={location.name}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{
            align: 'center'
          }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mb: 2
            }}
          >
            <Typography component='h4' variant='h5' color='text.primary' sx={textColor()}>
              {status}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography component='h5' variant='subtitle1' sx={{ fontWeight: 'bolder' }}>
              First seen in:
            </Typography>

            {isLoading ? (
              <CircularProgress data-testid='card-loader-component' />
            ) : (
              <Stack direction='column' gap='3px'>
                <Typography component='h6' variant='subtitle2' color='text.primary' sx={{ textAlign: 'center' }}>
                  {data?.name}
                </Typography>
                <Typography component='h6' variant='subtitle2' color='text.primary' sx={{ textAlign: 'center' }}>
                  {`(${data?.episode})`}
                </Typography>
              </Stack>
            )}
          </Box>
        </CardContent>
        <CardActions>
          {/*<Button fullWidth variant='outlined' component={RouterLink} to={`/${NavigationTypeEnum.CHARACTER}/${id}`}>*/}
          {/*</Button>*/}

          <Button
            fullWidth
            variant='contained'
            onClick={() => navigate(`/${NavigationEnum.CHARACTERS}/${id}`)}
            data-testid='card-button-component'
          >
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
