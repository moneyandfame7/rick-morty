import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Image from 'mui-image'
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorder'

import { useAppSelector } from 'application/store'

import type { Character } from 'features/characters/type'
import { selectIsFavorite } from 'features/characters/services'
import { useToggleFavorite } from 'features/characters/hooks'

import { PrimaryButton } from 'shared/components/common/buttons'
import { Navigation } from 'shared/constants'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const isFavorite = useAppSelector(state => selectIsFavorite(state, character.id))
  const { toggle } = useToggleFavorite(character)
  const navigate = useNavigate()
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

        <IconButton
          aria-label="Add to favorites"
          size="medium"
          onClick={toggle}
          sx={{ color: isFavorite ? 'error.main' : 'text.secondary' }}
        >
          {isFavorite ? <FavoriteIcon sx={{ fontSize: '20px' }} /> : <FavoriteIconOutlined sx={{ fontSize: '20px' }} />}
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

        <PrimaryButton
          onClick={() => {
            navigate({ pathname: `/${Navigation.CHARACTERS}/${character.id}` })
          }}
        >
          Show more
        </PrimaryButton>
      </CardContent>
    </Card>
  )
}
