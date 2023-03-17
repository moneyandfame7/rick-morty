import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import { FC } from 'react'
import { ICharacter } from '../type'

interface CharacterCardProps {
  character: ICharacter
}
export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card variant='outlined' sx={{ padding: '1rem' }}>
      <CardContent
        sx={{
          padding: '0 0 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <div>
          <Typography variant='h2' fontSize={16} sx={{ opacity: 0.9 }} fontWeight={500}>
            {character.name}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            {character.species}
          </Typography>
        </div>

        <IconButton sx={{ borderRadius: '4px' }}>
          <BookmarkAddOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </CardContent>
      <Box
        component='div'
        sx={{
          userSelect: 'none',
          borderRadius: '8px',
          pointerEvents: 'none',
          position: 'relative',
          overflow: 'hidden',
          // height: { xs: 300, sm: 200 },
          p: 0,
          minHeight: '160px',
          maxHeight: '200px'
        }}
      >
        <CardMedia
          sx={{
            height: '100%',
            position: 'absolute',
            width: '100%',
            p: 0,
            display: 'flex',
            alignItems: 'center'
          }}
          component='img'
          image={character.image}
          loading='lazy'
        />
      </Box>
      <CardContent
        sx={{
          p: '10px 0 0 0 !important',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <Typography variant='body2' sx={{ opacity: 0.6, fontSize: 12 }}>
            Status:
          </Typography>
          <Typography variant='body2' sx={{ opacity: 1, fontSize: 16 }}>
            {character.status}
          </Typography>
        </div>

        <Button variant='contained' size='small'>
          Show more
        </Button>
      </CardContent>
    </Card>
  )
}
