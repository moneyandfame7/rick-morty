import { FC } from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import Image from 'mui-image'
import { Character } from '../type'
import { PrimaryButton } from 'shared/components/common/buttons'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card variant="outlined" sx={{ padding: '1rem' }}>
      <CardContent
        sx={{
          padding: '0 0 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textOverflow: 'ellipsis',
            width: '80%',
            userSelect: 'none'
          }}
        >
          <Tooltip title={character.name}>
            <Typography noWrap variant="h2" fontSize={18} sx={{ opacity: 0.9 }} fontWeight={800}>
              {character.name}
            </Typography>
          </Tooltip>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {character.species}
          </Typography>
        </div>

        <IconButton sx={{ borderRadius: '4px' }}>
          <BookmarkAddOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </CardContent>
      <Box
        component="div"
        sx={{
          userSelect: 'none',
          borderRadius: '8px',
          pointerEvents: 'none',
          position: 'relative',
          overflow: 'hidden',
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
        >
          <Image
            src={character.image}
            width="100%"
            height="100%"
            duration={300}
            style={{
              borderRadius: 8
            }}
          />
        </CardMedia>
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
          <Typography variant="body2" sx={{ opacity: 0.6, fontSize: 12 }}>
            Status:
          </Typography>
          <Typography variant="body2" sx={{ opacity: 1, fontSize: 16 }}>
            {character.status}
          </Typography>
        </div>

        <PrimaryButton>Show more</PrimaryButton>
      </CardContent>
    </Card>
  )
}
