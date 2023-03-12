import React, { FC } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getRandomFromInterval } from 'shared/utils/randomNumber'
import { useTheme } from '@mui/material'

const ImgMediaCard = () => {
  const theme = useTheme()
  const video = `https://rick-morty.s3.eu-central-1.amazonaws.com/videos/${getRandomFromInterval(1, 4)}.mp4`
  return (
    <>
      <Card sx={{ width: '100%', height: { xs: 'max-content', md: 500 }, position: 'absolute' }}>
        <Box
          component='div'
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
            component='div'
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
        <CardMedia sx={{ zIndex: -5 }} component='video' src={video} autoPlay muted loop />
      </Card>
    </>
  )
}
export const HomePage: FC = () => {
  return <ImgMediaCard />
}
