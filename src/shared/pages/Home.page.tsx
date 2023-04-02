import React, { FC, useEffect, useRef } from 'react'
import Image from 'mui-image'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Divider, Grid, ImageList, ImageListItem, Stack, useMediaQuery, useTheme } from '@mui/material'
import CountUp from 'react-countup'
import { useGetManyCharactersQuery } from 'features/characters/services'
import { getRandomFromInterval } from 'shared/utils/randomNumber'
import { useGetCount } from '../hooks/useGetCount'

const ImgMediaCard = () => {
  const theme = useTheme()
  const video = `https://rick-morty.s3.eu-central-1.amazonaws.com/videos/${getRandomFromInterval(1, 4)}.mp4`
  return (
    <Card sx={{ width: '100%', height: { xs: 'max-content', md: 500 }, position: 'absolute' }}>
      <Box
        component="div"
        sx={{
          zIndex: 2,
          userSelect: 'none',
          backgroundColor: '#01010154',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0
        }}
      >
        <Box
          component="div"
          sx={{
            p: { xs: 1, md: 3 },
            m: '30px 0 0 10px',
            background: theme.palette.mode === 'light' ? '#ffffff6b' : '#01010154',
            borderRadius: 4,
            display: 'inline-block'
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 40, md: 50 }
            }}
            fontWeight={700}
          >
            Rick&Morty API
          </Typography>
        </Box>
      </Box>
      <CardMedia sx={{ zIndex: -5 }} component="video" src={video} autoPlay muted loop />
    </Card>
  )
}

export const HomePage: FC = () => {
  const randomPage = useRef<number>(1)
  const theme = useTheme()
  useEffect(() => {
    randomPage.current = getRandomFromInterval(1, 42)
  }, [])
  const { data, isFetching, isError, error } = useGetManyCharactersQuery(`page=${randomPage.current}`)
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const countOfEntities = useGetCount()
  /*  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrolledToBottom =
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight) < 1

    console.log(scrolledToBottom)
    if (scrolledToBottom && !isFetching) {
      console.log('Fetching more data...')
      setPage(page + 1)
    }
  }*/

  const showImageList = () => {
    if (isFetching) {
      return 'loading...'
    }
    if (!data?.results) {
      return null
    }
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          p: 1,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '3 !important',
              md: '5 !important'
            },
            width: { xs: '100%', md: 'max-content' }
          }}
          gap={matchDownMd ? 8 : 20}
        >
          {data.results.map(character => (
            <ImageListItem key={character.image} sx={{ width: '100%' }}>
              <Image
                src={character.image}
                alt={character.name}
                duration={300}
                style={{
                  borderRadius: 8
                }}
              />
              {/*    <ImageListItemBar
                title={character.name}
                subtitle={character.status}
                sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#210136e0' : '#7c46a0b5', userSelect: 'none' }}
                actionIcon={
                  <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${character.name}`}>
                    <InfoIcon />
                  </IconButton>
                }
              />*/}
            </ImageListItem>
          ))}
        </ImageList>
        {/*   {isFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularLoader />
          </Box>
        )}*/}
      </Box>
    )
  }
  return (
    <Stack direction="column" gap={3} alignItems="center">
      <Stack direction="column" gap={0.3} alignItems="center" sx={{ py: 3 }}>
        <Typography fontSize={14} color="primary.dark" fontWeight={600}>
          About the website
        </Typography>
        <Typography fontWeight={600} fontSize={48}>
          Rickmorty API
        </Typography>
        <Typography fontSize={16} sx={{ lineHeight: '30px' }} color="text.secondary">
          Hundreds of characters, images, locations, and episodes.
        </Typography>
      </Stack>

      {countOfEntities && (
        <Grid container>
          {countOfEntities.map(entity => (
            <Grid
              key={entity.label}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <CountUp end={entity.count} duration={6} delay={0}>
                {({ countUpRef }) => (
                  <Typography ref={countUpRef} fontWeight={600} fontSize={60} color="primary.main" sx={{ mb: -1 }} />
                )}
              </CountUp>
              <Typography variant="body1" fontWeight={500}>
                {entity.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Divider component="div" role="presentation" sx={{ width: '85%' }} />
      {showImageList()}
    </Stack>
  )
}
